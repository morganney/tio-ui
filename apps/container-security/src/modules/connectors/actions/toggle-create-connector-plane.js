import { TOGGLE_CREATE_CONNECTOR_PLANE } from './types';

const toggleCreateConnectorPlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_CREATE_CONNECTOR_PLANE,
        payload: displayType
    };
};

export {
    toggleCreateConnectorPlane
};
