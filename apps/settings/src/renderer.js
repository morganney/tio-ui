import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import { OverviewComponent } from './modules/about/components';

const Renderer = (props) => {
    return (
        <Switch>
            <Route path={`${props.match.path}`} component={OverviewComponent} />
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
