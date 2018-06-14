import {
    fetchDashboardDataThenVisualizationData,
    deleteDashboardWidget,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const deleteDashboardWidgetAndFetchDashboardData = (dashboardUuid = null, widgetUuid = null) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(deleteDashboardWidget(dashboardUuid, widgetUuid));
            const success = getState()[BRANCH_NAME][STEM_NAME].dashboardWidgetDeleted.success;

            if (success) {
                await dispatch(fetchDashboardDataThenVisualizationData(dashboardUuid));
                dispatch(setNotificationState({
                    type: 'success',
                    message: 'Widget successfully deleted'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    message: 'Failed to delete the widget'
                }));
            }
        })();
    };
};

export {
    deleteDashboardWidgetAndFetchDashboardData
};
