import {
    GET_CONNECTORS_REQUEST,
    GET_CONNECTORS_SUCCESS,
    GET_CONNECTORS_ERROR
} from '../actions/types';

const connectorsFetching = (state = false, action) => {
    switch (action.type) {
        case GET_CONNECTORS_REQUEST:
            return true;
        case GET_CONNECTORS_SUCCESS:
        case GET_CONNECTORS_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    connectorsFetching
};
