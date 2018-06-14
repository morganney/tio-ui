import {
    DELETE_DASHBOARD_WIDGET_SUCCESS,
    DELETE_DASHBOARD_WIDGET_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};

const dashboardWidgetDeleted = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_DASHBOARD_WIDGET_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case DELETE_DASHBOARD_WIDGET_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    dashboardWidgetDeleted
};
