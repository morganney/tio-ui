import { OPEN_DASHBOARD_SETTINGS_FILTER_PLANE } from './types';

const openDashboardSettingsFilterPlane = (openState = false) => {
    return {
        type: OPEN_DASHBOARD_SETTINGS_FILTER_PLANE,
        payload: openState
    };
};

export { openDashboardSettingsFilterPlane };
