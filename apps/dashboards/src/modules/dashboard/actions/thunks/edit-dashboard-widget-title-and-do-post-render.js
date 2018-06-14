import {
    fetchDashboardDataThenVisualizationData,
    editDashboardWidgetTitle,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const editDashboardWidgetTitleAndDoPostRender = (dashboardUuid = null, widgetUuid = null, payload = {}) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(editDashboardWidgetTitle(dashboardUuid, widgetUuid, payload));
            const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
            const { success } = dashboardState.dashboardWidgetTitleEdited;

            if (success) {
                await dispatch(fetchDashboardDataThenVisualizationData(dashboardUuid));

                dispatch(setNotificationState({
                    type: 'success',
                    message: 'Successfully edited the dashboard component title.'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    message: 'Failed to edit the dashboard component title.'
                }));
            }
        })();
    };
};

export {
    editDashboardWidgetTitleAndDoPostRender
};
