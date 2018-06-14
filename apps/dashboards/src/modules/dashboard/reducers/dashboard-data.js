import { DASHBOARD_DATA_SUCCESS, DASHBOARD_DATA_ERROR } from '../actions/types';

const dashboardData = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_DATA_SUCCESS: {
            return action.payload;
        }
        case DASHBOARD_DATA_ERROR: {
            return {
                ...state,
                errorMessage: 'There was an error in processing your request.'
            };
        }
        default:
            return state;
    }
};

export { dashboardData };
