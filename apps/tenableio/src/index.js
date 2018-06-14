import 'tenable-telemetry';
import React from 'react';
import ReactDOM from 'react-dom';
import { Loader } from '@hivekit/loader';
import { Route } from 'react-router-dom';

import { Alloy, Store, Utils, Rest, Poll, Bus } from 'tio-alloy';
import { session as sessionUtils } from 'tio-common';
import * as containerSecurity from 'tio-container-security';
import * as dashboards from 'tio-dashboards';
import * as settings from 'tio-settings';
import * as vulnerabilityManagement from 'tio-vm';
import * as lumin from 'tio-lumin';

import Views from './presentations';
import Messages from './messages';
import * as Validation from './validation';
import { reducer } from './reducer';
import * as properties from './modules/properties';
import * as session from './modules/session';
import { Tenableio } from './app';

const combinedReducers = Utils.processReducerTrees(reducer);
const appSlices = {
    containerSecurity,
    dashboards,
    settings,
    vulnerabilityManagement,
    lumin
};

const initAppPolls = () => {
    const hearbeatInterval = 30000;

    Poll.start('heartbeat', session.actions.fetchHeartBeat(), hearbeatInterval);
};

const initAppGlobalInterface = () => {
    const mockFlags = [];
    // tio will have a small footprint exposed on the global window object. This will be largely for testing purposes but will likely be needed in us-2b as well.
    window.tio = {
        mockFeatures: (...featureTags) => {
            if (featureTags.length === 0) {
                return 'No feature areas provided';
            }

            let mockFeatures = featureTags;
            const firstMockFeatureAsArray = mockFeatures[0].split(',');

            // account for someone trying to call with 'vm, dashboards, settings' instead of 'vm', 'dashboards', 'settings'
            if (firstMockFeatureAsArray.length > 1) {
                mockFeatures = firstMockFeatureAsArray;
            }

            Rest.configure({ mockFeatures });

            return `redirecting all api calls associated with ${mockFeatures} to the mock middleware`;
        },
        clearMockFeatures: () => {
            Rest.configure({ clearMockFeatures: true });
        },
        setFF: (flagName) => {
            if (mockFlags.indexOf(flagName) >= 0) {
                return 'flag already enabled';
            }

            mockFlags.push(flagName);
            Store.dispatch(session.actions.setTempFeatureFlag(flagName));
        },
        clearFF: (flagName) => {
            const mockFlagIndex = mockFlags.indexOf(flagName);

            if (!Store.getState().core.session.activeFeatures[flagName] || mockFlagIndex < 0) {
                return 'provided flag name not currently active or cannot be controlled from this method';
            }

            if (mockFlagIndex >= 0) {
                mockFlags.splice(mockFlagIndex, 1);
            }

            Store.dispatch(session.actions.clearTempFeatureFlag(flagName));
        }
    };
};

const initAppEventHandlers = () => {
    // any other app level listeners for the bus can go here
    Bus.on('apiError', (msg) => {
        // global error handling logic will be expanded here. If we want to do anything special based on type of error the app will handle it here
        if (msg.indexOf('401') > -1) {
            sessionUtils.destroy();
            Store.dispatch(session.actions.sessionDestroy());
        }
    });
};

const init = async () => {
    // TODO: once full session/server properties are being parsed, check for valid session here and return early. Right now technically, the app detects a bad session due to the
    // below call to "GET /session" will fail and trigger the apiError handling above. But in the long run we will want more overt checking of valid session.

    const alloyConfig = {
        rest: {
            headers: {
                'X-Cookie': `token=${Utils.storage.get('Iron.token')}`
            },
            // Global thats defined in wepback via the DefinePlugin
            apiPrefix: API_PREFIX,
            mockPrefix: 'mock/'
        },
        logs: {
            // Global thats defined in wepback via the DefinePlugin
            logLevel: LOG_LEVEL,
            debug: false
        }
    };

    initAppEventHandlers();

    ReactDOM.render(<Loader show={true} />, Alloy.RENDER_TO);

    // initialize telemetry lib as part of the app boostrap
    telemetry.enable('tenable-io/webui-frontend-nextgen');

    // RUN_MOCK Global defined by webpack via the DefinePlugin
    if (RUN_MOCK) {
        alloyConfig.rest.runMock = true;
    }

    await Alloy.setup(alloyConfig);

    Store.mount({
        name: 'core',
        reducers: combinedReducers
    });

    await Promise.all([
        Store.dispatch(properties.actions.fetchProperties()),
        Store.dispatch(session.actions.fetchSession())
    ]);

    const coreState = Store.getState().core;
    const { apps, defaults: sessionDefaults, userPreferences } = coreState.session;
    const { defaults: serverDefaults } = coreState.properties;
    const licensedApps = sessionDefaults.apps;
    const renderRoutes = [];

    // TODO: migrate GET server/properties and GET /session data parsing from current gen into properties and session reducers
    //  until zippering is setup. Once that is setup this logic will be tweaked to reference the final store object.

    const telemetryTraits = {
        container_id: sessionDefaults.container_uuid,
        site_id: serverDefaults.analytics.site_id
    };

    if ((/Eval/gi).test(sessionDefaults.container_name)) {
        telemetryTraits.eval = true;
    }

    telemetry.identify(sessionDefaults.uuid, telemetryTraits);

    Object.keys(apps.active).forEach((name) => {
        const app = apps.active[name];

        // Check licensing for activated apps (feature flag on)
        if (licensedApps[app.licenseKey]) {
            app.hasLicense = true;
        }

        /**
         * The "app.legacyActive || (app.licenseKey && !app.hasLicense)" logic is here to prevent users that are
         * entering the url directly from accessing micro-app views that they either (A) don't have the feature flag
         * on for or (B) don't have a license for.
         *
         * The "!apps.root" logic is here for apps that are enabled via a FF for nextgen but don't have any source
         * code in tio_ui.
         *
         * TODO: Remove "!apps.root || app.legacyActive || (app.licenseKey && !app.hasLicense)" once migration is done
         */
        if (name === 'default' || !app.root || app.legacyActive || (app.licenseKey && !app.hasLicense)) {
            return;
        }

        // Only create routes and reducers for nextgen active apps under development
        const thisSlice = appSlices[name];

        Store.mount({
            name,
            reducers: Utils.processReducerTrees(thisSlice.reducers)
        });

        renderRoutes.push(<Route path={thisSlice.BASE_PATH} component={thisSlice.Renderer} key={name} />);
    });

    Object.keys(apps.inactive).forEach((name) => {
        if (appSlices.hasOwnProperty(name)) {
            apps.inactive[name].navItems = appSlices[name].navItems;
        }
    });

    initAppPolls();

    // only setup tio interface on local/internal/testing environments
    const hostRegex = RegExp('us-2b|qa-|localhost');

    if (hostRegex.test(window.location.hostname)) {
        initAppGlobalInterface();
    }

    ReactDOM.render(
        <Tenableio
            apps={apps}
            history={Store.getHistory()}
            store={Store.getStore()}
            routes={renderRoutes}
            userPreferences={userPreferences}
        />, Alloy.RENDER_TO);
};

init();

// Please do not import from this interface if you are app code - you'll invoke circular dependencies which is an anti-pattern.
export {
    Views,
    Messages,
    Validation
};
