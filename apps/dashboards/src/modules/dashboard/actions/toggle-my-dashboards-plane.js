import { TOGGLE_MY_DASHBOARDS_PLANE } from './types';

const toggleMyDashboardsPlane = (displayState = 'closed') => {
    return {
        type: TOGGLE_MY_DASHBOARDS_PLANE,
        payload: displayState
    };
};

export { toggleMyDashboardsPlane };
