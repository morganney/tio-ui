import { STANDARD_API_ACTION, Utils } from 'tio-alloy';

import {
    SESSION_REQUEST,
    SESSION_SUCCESS,
    SESSION_ERROR
} from './types';

const fetchSession = () => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                SESSION_REQUEST,
                SESSION_SUCCESS,
                SESSION_ERROR
            ],
            request: '/session',
            processResponseBeforeDispatch: (responseData) => {
                const featureKeys = Object.keys(responseData.features);
                // CONFIGURED_APPS is a global object setup and made available by webpack.
                const appKeys = Object.keys(CONFIGURED_APPS);
                const activeApps = { default: CONFIGURED_APPS.default };
                const activeFeatures = {};
                const inactiveApps = {};
                const userPreferences = {};
                const organizeAppsByActiveFeatures = () => {
                    for (let i = appKeys.length; i--;) {
                        const key = appKeys[i];
                        const thisApp = CONFIGURED_APPS[key];
                        const nextgenEnabled = thisApp.featureFlag ? activeFeatures[thisApp.featureFlag] : true;
                        const legacyEnabled = activeFeatures[thisApp.legacy.featureFlag];

                        if (nextgenEnabled) {
                            /**
                             * Mark it legacy-active if its not under development in nextgen,
                             * but still enabled via currentgen feature flags. For example, developers.
                             */
                            if (!thisApp.root && legacyEnabled) {
                                thisApp.legacyActive = true;
                            }

                            activeApps[key] = thisApp;
                        } else if (legacyEnabled) {
                            thisApp.legacyActive = true;
                            activeApps[key] = thisApp;
                        } else {
                            inactiveApps[key] = thisApp;
                        }
                    }
                };
                const enableEarlyAccessForLuminBeta = () => {
                    for (let i = appKeys.length; i--;) {
                        const key = appKeys[i];
                        const thisApp = CONFIGURED_APPS[key];

                        if (thisApp.earlyAccess) {
                            thisApp.legacyActive = false;
                            activeApps[key] = thisApp;
                            delete inactiveApps[key];
                        }
                    }
                };

                // Remove 'default' app key before processing
                appKeys.splice(appKeys.indexOf('default'), 1);

                for (let i = featureKeys.length; i--;) {
                    const key = featureKeys[i];

                    if (responseData.features[key]) {
                        activeFeatures[key] = true;
                    }
                }

                organizeAppsByActiveFeatures();

                if (activeApps.lumin) {
                    enableEarlyAccessForLuminBeta();
                }

                /**
                 * NOTE: Crazy alert, credentials_mgmt is a legacy only FF that
                 * allows access to nextgen features under the settings app.
                 *
                 * The VM app should still be present in the global nav if CCM
                 * is enabled while VM gen2 is not.
                 */
                if (activeFeatures.credentials_mgmt && inactiveApps.vulnerabilityManagement) {
                    const vmApp = inactiveApps.vulnerabilityManagement;

                    vmApp.legacyActive = true;
                    activeApps.vulnerabilityManagement = vmApp;
                    delete inactiveApps.vulnerabilityManagement;
                }

                if (Utils.storage.exists('defaultDashboard')) {
                    userPreferences.defaultDashboard = Utils.storage.get('defaultDashboard');
                }

                // add temp/mock ff here for uninterrupted development
                // activeFeatures.myHiddenFeature = true;

                return {
                    defaults: responseData,
                    activeFeatures,
                    apps: {
                        active: activeApps,
                        inactive: inactiveApps
                    },
                    userPreferences
                };
            }
        }
    };
};

export {
    fetchSession
};
