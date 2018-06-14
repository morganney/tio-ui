import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Plane } from '@hivekit/plane';

import { ConnectorsComponent } from '../';

const ConnectorsPlaneView = ({
    history,
    match
}) => {
    const handlePlaneChange = (planeState) => {
        if (planeState === 'closed') {
            history.push('/settings');
        }
    };

    const getContent = () => {
        return (
            <Route path={match.path} component={ConnectorsComponent} />
        );
    };

    const isConnectorsView = history.location.pathname === match.path;

    return (
        <Plane
            onChange={handlePlaneChange}
            display={isConnectorsView ? 'full' : 'closed'}
            full={getContent}
            baseView={isConnectorsView}>
        </Plane>
    );
};

ConnectorsPlaneView.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export {
    ConnectorsPlaneView
};
