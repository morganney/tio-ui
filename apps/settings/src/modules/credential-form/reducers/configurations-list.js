import { GET_CONFIGURATIONS_LIST_SUCCESS, GET_CONFIGURATIONS_LIST_ERROR } from '../actions/types';

const configurationsList = (state = [], action) => {
    switch (action.type) {
        case GET_CONFIGURATIONS_LIST_SUCCESS:
            return action.payload.credentials || [];
        case GET_CONFIGURATIONS_LIST_ERROR:
            return state;
        default:
            return state;
    }
};

export {
    configurationsList
};
