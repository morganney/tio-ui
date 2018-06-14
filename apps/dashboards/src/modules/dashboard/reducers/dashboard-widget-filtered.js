import {
    FILTER_DASHBOARD_WIDGET_SUCCESS,
    FILTER_DASHBOARD_WIDGET_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};

const dashboardWidgetFiltered = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_DASHBOARD_WIDGET_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case FILTER_DASHBOARD_WIDGET_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    dashboardWidgetFiltered
};
