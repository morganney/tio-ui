import {
    DELETE_DASHBOARD_SUCCESS,
    DELETE_DASHBOARD_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};

const dashboardDeleted = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_DASHBOARD_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case DELETE_DASHBOARD_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    dashboardDeleted
};
