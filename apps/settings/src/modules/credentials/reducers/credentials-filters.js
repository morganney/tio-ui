import {
    GET_CREDENTIALS_FILTERS_SUCCESS
} from '../actions/types';

const credentialsFilters = (state = {}, action) => {
    switch (action.type) {
        case GET_CREDENTIALS_FILTERS_SUCCESS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export {
    credentialsFilters
};
