import {
    fetchDashboardDataThenVisualizationData,
    copyDashboardWidget,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const copyDashboardWidgetAndFetchDashboardData = (dashboardUuid = null, widgetUuid = null) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(copyDashboardWidget(dashboardUuid, widgetUuid));
            const success = getState()[BRANCH_NAME][STEM_NAME].dashboardWidgetCopied.success;

            if (success) {
                await dispatch(fetchDashboardDataThenVisualizationData(dashboardUuid));
                dispatch(setNotificationState({
                    type: 'success',
                    message: 'Widget successfully duplicated'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    message: 'Failed to duplicate the widget'
                }));
            }
        })();
    };
};

export {
    copyDashboardWidgetAndFetchDashboardData
};
