import {
    POLICIES_REQUEST,
    POLICIES_SUCCESS,
    POLICIES_ERROR
} from '../actions/types';

const policiesFetching = (state = false, action) => {
    switch (action.type) {
        case POLICIES_REQUEST:
            return true;
        case POLICIES_SUCCESS:
        case POLICIES_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    policiesFetching
};
