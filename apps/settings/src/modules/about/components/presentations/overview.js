import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import { NAVIGATION_LINKS } from '../../constants';
import {
    components as CredentialsComponents
} from '../../../credentials';
import {
    components as ConnectorsComponents
} from '../../../connectors';

const { CredentialsPlaneComponent } = CredentialsComponents;
const { ConnectorsPlaneComponent } = ConnectorsComponents;

const OverviewView = (props) => {
    const { featureFlags, match } = props;
    const routes = [];
    // TODO: Remove renderSettings, renderNavigation, and exact once a SettingsComponent has been created
    const renderNavigation = () => {
        const links = NAVIGATION_LINKS.map((entry) => {
            return (
                <li key={entry.moduleName} data-id={entry.moduleName}>
                    <NavLink to={entry.link}>
                        {entry.label}
                    </NavLink>
                </li>
            );
        });

        return (
            <ul>
                {links}
            </ul>
        );
    };

    const renderSettings = () => {
        return (
            <Fragment>
                <p>Hello World! I am the Settings Page!</p>
                {renderNavigation()}
            </Fragment>
        );
    };

    if (featureFlags.settings) {
        routes.push(
            <Route path={`${match.path}`} exact render={renderSettings} key='settings' />
        );
    }

    if (featureFlags.credentialsMgmt) {
        routes.push(
            <Route path={`${match.path}/credentials`} component={CredentialsPlaneComponent} key='credentials' />
        );
    }

    if (featureFlags.connectors) {
        routes.push(
            <Route path={`${match.path}/connectors`} component={ConnectorsPlaneComponent} key='connectors' />
        );
    }

    return (
        <Switch>
            {routes}
            <Redirect to={window.location.hostname === 'localhost' ? '/not-found' : '/feature-not-found'} />
        </Switch>
    );
};

OverviewView.propTypes = {
    match: PropTypes.object.isRequired,
    featureFlags: PropTypes.object.isRequired
};

export {
    OverviewView
};
