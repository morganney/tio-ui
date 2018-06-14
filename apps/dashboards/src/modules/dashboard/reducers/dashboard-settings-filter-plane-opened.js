import { OPEN_DASHBOARD_SETTINGS_FILTER_PLANE } from '../actions/types';

const dashboardSettingsFilterPlaneOpened = (state = false, action) => {
    switch (action.type) {
        case OPEN_DASHBOARD_SETTINGS_FILTER_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export { dashboardSettingsFilterPlaneOpened };
