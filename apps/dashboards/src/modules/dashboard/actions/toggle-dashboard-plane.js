import { TOGGLE_DASHBOARD_PLANE } from './types';

import { PLANE_VIEW } from '../constants';

const toggleDashboardPlane = (displayState = PLANE_VIEW.CLOSED) => {
    return {
        type: TOGGLE_DASHBOARD_PLANE,
        payload: displayState
    };
};

export { toggleDashboardPlane };
