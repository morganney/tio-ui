import { TOGGLE_MY_DASHBOARDS_PLANE } from '../actions/types';

const myDashboardsPlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_MY_DASHBOARDS_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export { myDashboardsPlaneDisplay };
