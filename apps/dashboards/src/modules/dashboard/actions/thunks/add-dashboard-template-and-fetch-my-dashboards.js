import {
    fetchMyDashboards,
    addDashboardTemplate,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const addDashboardTemplateAndFetchMyDashboards = (dashboardUuid = null) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(addDashboardTemplate(dashboardUuid));
            const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
            const { success, data } = dashboardState.dashboardTemplateAdded;

            if (success) {
                await dispatch(fetchMyDashboards());
                dispatch(setNotificationState({
                    type: 'success',
                    message: 'Added to Dashboards',
                    id: data.uuid
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    message: 'Failed to add dashboard template.'
                }));
            }
        })();
    };
};

export {
    addDashboardTemplateAndFetchMyDashboards
};
