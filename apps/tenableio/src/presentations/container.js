import React from 'react';
import PropTypes from 'prop-types';
import { HiveProvider } from '@hivekit/provider';

const Container = ({ active, children }) => {
    if (!active) {
        return null;
    }

    return (
        <HiveProvider>
            <div id='tio-container'>
                {children}
            </div>
        </HiveProvider>
    );
};

Container.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool.isRequired
};

export { Container };
