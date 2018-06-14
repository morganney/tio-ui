import { OPEN_DASHBOARD_TEMPLATES_PLANE } from '../actions/types';

const dashboardTemplatesPlaneDisplayOpened = (state = false, action) => {
    switch (action.type) {
        case OPEN_DASHBOARD_TEMPLATES_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export { dashboardTemplatesPlaneDisplayOpened };
