import { SET_DASHBOARD_PLANE_CONTENT } from '../actions/types';
import { PLANE } from '../constants';

const dashboardPlaneContent = (state = PLANE.MY_DASHBOARDS, action) => {
    switch (action.type) {
        case SET_DASHBOARD_PLANE_CONTENT:
            return action.payload;
        default:
            return state;
    }
};

export { dashboardPlaneContent };
