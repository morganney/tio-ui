import {
    ORGANIZATION_STATS_SUCCESS,
    ORGANIZATION_STATS_ERROR
} from '../actions/types';

const organizationStatsError = (state = '', action) => {
    switch (action.type) {
        case ORGANIZATION_STATS_SUCCESS: {
            return '';
        }
        case ORGANIZATION_STATS_ERROR: {
            return 'organizationStatsDataFetchError';
        }
        default:
            return state;
    }
};

export {
    organizationStatsError
};
