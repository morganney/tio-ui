import { TOGGLE_CREATE_CONNECTOR_PLANE } from '../actions/types';

const createConnectorPlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_CREATE_CONNECTOR_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    createConnectorPlaneDisplay
};
