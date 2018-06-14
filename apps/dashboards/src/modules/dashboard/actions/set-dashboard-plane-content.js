import { SET_DASHBOARD_PLANE_CONTENT } from './types';

const setDashboardPlaneContent = (content) => {
    return {
        type: SET_DASHBOARD_PLANE_CONTENT,
        payload: content
    };
};

export { setDashboardPlaneContent };
