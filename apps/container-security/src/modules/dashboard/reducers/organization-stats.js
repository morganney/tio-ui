import {
    ORGANIZATION_STATS_SUCCESS,
    ORGANIZATION_STATS_ERROR
} from '../actions/types';

const initialState = {};

const organizationStats = (state = initialState, action) => {
    switch (action.type) {
        case ORGANIZATION_STATS_SUCCESS: {
            return {
                ...state,
                payload: action.payload
            };
        }
        case ORGANIZATION_STATS_ERROR: {
            return {
                ...state,
                payload: null
            };
        }
        default:
            return state;
    }
};

export {
    organizationStats
};
