import { DASHBOARD_TEMPLATES_SUCCESS } from '../actions/types';

const dashboardTemplates = (state = [], action) => {
    switch (action.type) {
        case DASHBOARD_TEMPLATES_SUCCESS:
            return action.payload.templates;
        default:
            return state;
    }
};

export { dashboardTemplates };
