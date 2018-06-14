import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DashboardComponent } from './modules/dashboard/components';
import { ScheduleTesting } from './modules/dashboard/schedule-testing';

const Renderer = (props) => {
    return (
        <Switch>
            <Route path={`${props.match.path}/schedule-testing`} exact component={ScheduleTesting} />
            <Route path={`${props.match.path}/vulnerability-management`} component={DashboardComponent} />
            <Route path={`${props.match.path}/:dashboardUuid`} component={DashboardComponent} />
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
