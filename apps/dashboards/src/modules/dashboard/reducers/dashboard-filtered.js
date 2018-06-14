import {
    FILTER_DASHBOARD_SUCCESS,
    FILTER_DASHBOARD_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};

const dashboardFiltered = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_DASHBOARD_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case FILTER_DASHBOARD_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    dashboardFiltered
};
