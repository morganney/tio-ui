import React from 'react';
import PropTypes from 'prop-types';
import { Plane } from '@hivekit/plane';
import { Route } from 'react-router-dom';

import { CredentialsComponent } from '../';

const CredentialsPlaneView = (props) => {
    const handlePlaneChange = (planeState) => {
        const { history } = props;

        if (planeState === 'closed') {
            history.push(`/settings`);
        }
    };

    const getContent = () => {
        return (
            <Route path='/settings/credentials' component={CredentialsComponent} />
        );
    };

    const { history } = props;
    const isCredentialsView = history.location.pathname.indexOf(`/settings/credentials`) === 0;

    // TODO: Remove baseView property, once settings has been migrated over
    return (
        <Plane
            onChange={handlePlaneChange}
            display={isCredentialsView ? 'full' : 'closed'}
            baseView={isCredentialsView}
            full={getContent}>
        </Plane>
    );
};

CredentialsPlaneView.propTypes = {
    history: PropTypes.object.isRequired
};

export {
    CredentialsPlaneView
};
