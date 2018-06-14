import { DASHBOARD_TEMPLATE_PREVIEW_SUCCESS, RESET_DASHBOARD_TEMPLATE_PREVIEW } from '../actions/types';

const dashboardTemplatePreview = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_TEMPLATE_PREVIEW_SUCCESS:
            return action.payload;
        case RESET_DASHBOARD_TEMPLATE_PREVIEW:
            return action.payload;
        default:
            return state;
    }
};

export { dashboardTemplatePreview };
