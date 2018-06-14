import {
    ORGANIZATION_STATS_REQUEST,
    ORGANIZATION_STATS_SUCCESS,
    ORGANIZATION_STATS_ERROR
} from '../actions/types';

const initialState = false;

const isOrganizationStatsFetching = (state = initialState, action) => {
    switch (action.type) {
        case ORGANIZATION_STATS_REQUEST:
            return true;
        case ORGANIZATION_STATS_SUCCESS:
        case ORGANIZATION_STATS_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    isOrganizationStatsFetching
};
