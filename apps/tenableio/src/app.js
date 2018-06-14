import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';
import { Provider } from 'react-intl-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Utils } from 'tio-alloy';

import { NavigationComponent as Navigation } from './containers';
import Views from './presentations';
import fonts from './fonts.css';

class Tenableio extends Component {
    static propTypes = {
        apps: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired,
        userPreferences: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props);

        injectGlobal`${fonts.toString()}`;
    }

    render () {
        const { Container, NotFound } = Views;
        const { store, history, apps, routes, userPreferences } = this.props;
        const active = apps.active;
        const defaultApp = active[active.default];
        let redirectTo = '/feature-not-found';
        let defaultLandingPath = '/not-found';

        if (defaultApp) {
            defaultLandingPath = defaultApp.home;
        }

        if (userPreferences.defaultDashboard) {
            defaultLandingPath = `/dashboards/${userPreferences.defaultDashboard}`;
        }

        // temporarary if No FF are found then we want to redirect to oldGen
        if (window.location.hostname === 'localhost') {
            redirectTo = '/not-found';
        }

        const FeatureNotFound = () => {
            window.location = '/app.html';

            return null;
        };

        // TODO make route setup dynamic based on active apps not hardcoded like this.
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Container active={true}>
                        <Navigation apps={apps} />
                        <Switch>
                            {routes}
                            <Route path='/logout' render={() => {
                                //  TODO: replace with session.destroy() from alloy
                                Utils.storage.remove('Iron.token');
                                window.location = '/';

                                return null;
                            }} />
                            <Route path='/not-found' component={NotFound} />
                            <Route path='/feature-not-found' component={FeatureNotFound} />
                            <Redirect from='/' exact to={defaultLandingPath} />
                            <Redirect to={redirectTo} />
                        </Switch>
                    </Container>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export {
    Tenableio
};
