import {
    ADD_DASHBOARD_TEMPLATE_SUCCESS,
    ADD_DASHBOARD_TEMPLATE_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};

const dashboardTemplateAdded = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DASHBOARD_TEMPLATE_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case ADD_DASHBOARD_TEMPLATE_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    dashboardTemplateAdded
};
