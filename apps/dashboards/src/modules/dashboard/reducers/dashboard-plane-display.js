import { TOGGLE_DASHBOARD_PLANE } from '../actions/types';
import { PLANE_VIEW } from '../constants';

const dashboardPlaneDisplay = (state = PLANE_VIEW.CLOSED, action) => {
    switch (action.type) {
        case TOGGLE_DASHBOARD_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export { dashboardPlaneDisplay };
