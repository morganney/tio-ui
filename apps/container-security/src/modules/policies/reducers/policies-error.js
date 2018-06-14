import {
    POLICIES_SUCCESS,
    POLICIES_ERROR
} from '../actions/types';

const policiesError = (state = false, action) => {
    switch (action.type) {
        case POLICIES_SUCCESS:
            return false;
        case POLICIES_ERROR:
            return 'genericApiError';
        default:
            return state;
    }
};

export {
    policiesError
};
