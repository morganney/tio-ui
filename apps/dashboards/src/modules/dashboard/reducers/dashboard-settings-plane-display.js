import { TOGGLE_DASHBOARD_SETTINGS_PLANE } from '../actions/types';

const dashboardSettingsPlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_DASHBOARD_SETTINGS_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export { dashboardSettingsPlaneDisplay };
