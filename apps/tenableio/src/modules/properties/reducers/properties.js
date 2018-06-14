import {
    PROPERTIES_REQUEST,
    PROPERTIES_SUCCESS,
    PROPERTIES_ERROR
} from '../actions/types';

const properties = (state = {}, action) => {
    switch (action.type) {
        case PROPERTIES_REQUEST:
            return state;
        case PROPERTIES_SUCCESS:
            return { ...state, defaults: action.payload };
        case PROPERTIES_ERROR:
            return state;
        default:
            return state;
    }
};

export {
    properties
};
