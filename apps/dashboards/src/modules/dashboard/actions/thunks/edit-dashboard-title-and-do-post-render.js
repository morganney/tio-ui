import {
    fetchDashboardData,
    fetchMyDashboards,
    editDashboardTitle,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const editDashboardTitleAndDoPostRender = (dashboardUuid = null, payload = {}, fetchDashboard = true) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(editDashboardTitle(dashboardUuid, payload));
            const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
            const { success } = dashboardState.dashboardTitleEdited;

            if (success) {
                if (fetchDashboard) {
                    await dispatch(fetchDashboardData(dashboardUuid));
                }

                await dispatch(fetchMyDashboards());
                dispatch(setNotificationState({
                    type: 'success',
                    message: 'Successfully edited the dashboard title.'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    message: 'Failed to edit the dashboard title.'
                }));
            }
        })();
    };
};

export {
    editDashboardTitleAndDoPostRender
};
