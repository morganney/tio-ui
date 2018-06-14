import {
    COPY_DASHBOARD_WIDGET_SUCCESS,
    COPY_DASHBOARD_WIDGET_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};

const dashboardWidgetCopied = (state = initialState, action) => {
    switch (action.type) {
        case COPY_DASHBOARD_WIDGET_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case COPY_DASHBOARD_WIDGET_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    dashboardWidgetCopied
};
