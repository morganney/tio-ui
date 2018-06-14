import { TOGGLE_DASHBOARD_SETTINGS_PLANE } from './types';

const toggleDashboardSettingsPlane = (displayState = 'closed') => {
    return {
        type: TOGGLE_DASHBOARD_SETTINGS_PLANE,
        payload: displayState
    };
};

export {
    toggleDashboardSettingsPlane
};
