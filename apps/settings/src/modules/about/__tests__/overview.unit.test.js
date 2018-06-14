import React from 'react';
import { shallow } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';

import * as components from '../components';
import * as credentialsComponents from '../../credentials/components';
import * as connectorsComponents from '../../connectors/components';

const { OverviewView } = components.presentations;
const { CredentialsPlaneComponent } = credentialsComponents;
const { ConnectorsPlaneComponent } = connectorsComponents;

describe('Settings - About Module - Overview Component', () => {
    const match = {
        path: '/settings',
        params: {}
    };
    const props = {
        match,
        featureFlags: {
            credentialsMgmt: false,
            connectors: false,
            settings: false
        }
    };

    let component = shallow(
        <OverviewView {...props} />
    );

    // TODO: Swap out render for the SettingsComponent once it is created
    const settingsRoute = (
        <Route path={`${match.path}`} exact render={expect.any(Function)} key='settings' />
    );

    const credentialsRoute = (
        <Route path={`${match.path}/credentials`} component={CredentialsPlaneComponent} key='credentials' />
    );

    const connectorsRoute = (
        <Route path={`${match.path}/connectors`} component={ConnectorsPlaneComponent} key='connectors' />
    );

    const redirect = (
        <Redirect to={window.location.hostname === 'localhost' ? '/not-found' : '/feature-not-found'} />
    );

    it('should render only redirect if all flags are off', () => {
        const foundRedirects = component.find('Redirect');

        expect(foundRedirects.length).toEqual(1);
        expect(foundRedirects.get(0)).toMatchObject(redirect);
    });

    it('should render credentials route and redirect if only credentials flag is on', () => {
        const newProps = {
            ...props,
            featureFlags: {
                credentialsMgmt: true
            }
        };

        component = shallow(
            <OverviewView {...newProps} />
        );

        const foundRoutes = component.find('Route');
        const foundRedirects = component.find('Redirect');

        expect(foundRoutes.length).toEqual(1);
        expect(foundRedirects.length).toEqual(1);
        expect(foundRoutes.get(0)).toMatchObject(credentialsRoute);
        expect(foundRedirects.get(0)).toMatchObject(redirect);
    });

    it('should render connectors route and redirect if only connectors flag is on', () => {
        const newProps = {
            ...props,
            featureFlags: {
                connectors: true
            }
        };

        component = shallow(
            <OverviewView {...newProps} />
        );

        const foundRoutes = component.find('Route');
        const foundRedirects = component.find('Redirect');

        expect(foundRoutes.length).toEqual(1);
        expect(foundRedirects.length).toEqual(1);
        expect(foundRoutes.get(0)).toMatchObject(connectorsRoute);
        expect(foundRedirects.get(0)).toMatchObject(redirect);
    });

    it('should render settings route and redirect if only settings flag is on', () => {
        const newProps = {
            ...props,
            featureFlags: {
                settings: true
            }
        };

        component = shallow(
            <OverviewView {...newProps} />
        );

        const foundRoutes = component.find('Route');
        const foundRedirects = component.find('Redirect');

        expect(foundRoutes.length).toEqual(1);
        expect(foundRedirects.length).toEqual(1);
        expect(foundRoutes.get(0)).toMatchObject(settingsRoute);
        expect(foundRedirects.get(0)).toMatchObject(redirect);
    });

    it('should render credentials route, connectors route, and redirect if all flags are on', () => {
        const newProps = {
            ...props,
            featureFlags: {
                credentialsMgmt: true,
                connectors: true
            }
        };

        component = shallow(
            <OverviewView {...newProps} />
        );

        const foundRoutes = component.find('Route');
        const foundRedirects = component.find('Redirect');
        const expectedLength = 2;

        expect(foundRoutes.length).toEqual(expectedLength);
        expect(foundRedirects.length).toEqual(1);
        expect(foundRoutes.get(0)).toMatchObject(credentialsRoute);
        expect(foundRoutes.get(1)).toMatchObject(connectorsRoute);
        expect(foundRedirects.get(0)).toMatchObject(redirect);
    });

    it('should render credentials route, settings route, and redirect if all flags are on', () => {
        const newProps = {
            ...props,
            featureFlags: {
                credentialsMgmt: true,
                settings: true
            }
        };

        component = shallow(
            <OverviewView {...newProps} />
        );

        const foundRoutes = component.find('Route');
        const foundRedirects = component.find('Redirect');
        const expectedLength = 2;

        expect(foundRoutes.length).toEqual(expectedLength);
        expect(foundRedirects.length).toEqual(1);
        expect(foundRoutes.get(0)).toMatchObject(settingsRoute);
        expect(foundRoutes.get(1)).toMatchObject(credentialsRoute);
        expect(foundRedirects.get(0)).toMatchObject(redirect);
    });

    it('should render connectors route, settings route, and redirect if all flags are on', () => {
        const newProps = {
            ...props,
            featureFlags: {
                connectors: true,
                settings: true
            }
        };

        component = shallow(
            <OverviewView {...newProps} />
        );

        const foundRoutes = component.find('Route');
        const foundRedirects = component.find('Redirect');
        const expectedLength = 2;

        expect(foundRoutes.length).toEqual(expectedLength);
        expect(foundRedirects.length).toEqual(1);
        expect(foundRoutes.get(0)).toMatchObject(settingsRoute);
        expect(foundRoutes.get(1)).toMatchObject(connectorsRoute);
        expect(foundRedirects.get(0)).toMatchObject(redirect);
    });

    it('should render all routes and redirect if all flags are on', () => {
        const newProps = {
            ...props,
            featureFlags: {
                credentialsMgmt: true,
                connectors: true,
                settings: true
            }
        };

        component = shallow(
            <OverviewView {...newProps} />
        );

        const foundRoutes = component.find('Route');
        const foundRedirects = component.find('Redirect');
        const expectedLength = 3;
        const two = 2;

        expect(foundRoutes.length).toEqual(expectedLength);
        expect(foundRedirects.length).toEqual(1);
        expect(foundRoutes.get(0)).toMatchObject(settingsRoute);
        expect(foundRoutes.get(1)).toMatchObject(credentialsRoute);
        expect(foundRoutes.get(two)).toMatchObject(connectorsRoute);
        expect(foundRedirects.get(0)).toMatchObject(redirect);
    });
});
