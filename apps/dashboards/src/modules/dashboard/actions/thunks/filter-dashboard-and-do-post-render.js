import {
    fetchDashboardDataThenVisualizationData,
    filterDashboard,
    openDashboardSettingsFilterPlane,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const filterDashboardAndDoPostRender = (dashboardUuid, payload = {}) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(filterDashboard(dashboardUuid, payload));
            const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
            const { success } = dashboardState.dashboardFiltered;

            if (success) {
                await dispatch(fetchDashboardDataThenVisualizationData(dashboardUuid));
                dispatch(openDashboardSettingsFilterPlane(false));

                dispatch(setNotificationState({
                    type: 'success',
                    message: 'Successfully updated dashboard settings.'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    message: 'Failed to update dashboard settings.'
                }));
            }
        })();
    };
};

export {
    filterDashboardAndDoPostRender
};
