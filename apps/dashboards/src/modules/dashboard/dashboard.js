import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { DashboardComponent } from './components';

const Dashboard = (props) => {
    return (
        <Switch>
            <Route path={props.match.path} exact component={DashboardComponent} />
            <Redirect to='/not-found' />
        </Switch>
    );
};

Dashboard.propTypes = {
    match: PropTypes.object
};

export {
    Dashboard
};
