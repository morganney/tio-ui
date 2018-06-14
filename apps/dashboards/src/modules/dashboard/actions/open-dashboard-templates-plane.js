import { OPEN_DASHBOARD_TEMPLATES_PLANE } from './types';

const openDashboardTemplatesPlane = (openState = false) => {
    return {
        type: OPEN_DASHBOARD_TEMPLATES_PLANE,
        payload: openState
    };
};

export { openDashboardTemplatesPlane };
