import {
    CREATE_CONNECTOR_SUCCESS,
    CREATE_CONNECTOR_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};

const connectorCreated = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONNECTOR_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case CREATE_CONNECTOR_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    connectorCreated
};
