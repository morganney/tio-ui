import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import { DashboardComponent } from 'tio-container-security/modules/dashboard/components';

const Renderer = ({
    match
}) => {
    return (
        <Switch>
            <Route path={`${match.path}/dashboard`} component={DashboardComponent} />
            <Redirect to='/not-found' />
        </Switch>
    );
};

Renderer.propTypes = {
    match: PropTypes.object
};

export {
    Renderer
};
