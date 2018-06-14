import {
    fetchDashboardDataThenVisualizationData,
    filterDashboardWidget,
    toggleMyDashboardsPlane,
    openDashboardSettingsFilterPlane,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const filterDashboardWidgetAndDoPostRender = (dashboardUuid, widgetUuid, payload = {}) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(filterDashboardWidget(dashboardUuid, widgetUuid, payload));
            const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
            const { success } = dashboardState.dashboardWidgetFiltered;

            if (success) {
                await dispatch(fetchDashboardDataThenVisualizationData(dashboardUuid));
                dispatch(toggleMyDashboardsPlane('closed'));
                dispatch(openDashboardSettingsFilterPlane(false));

                dispatch(setNotificationState({
                    type: 'success',
                    message: 'Successfully updated dashboard widget settings.'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    message: 'Failed to update dashboard widget settings.'
                }));
            }
        })();
    };
};

export {
    filterDashboardWidgetAndDoPostRender
};
