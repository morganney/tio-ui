import {
    fetchMyDashboards,
    copyDashboard,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const copyDashboardAndFetchMyDashboards = (dashboardUuid = null) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(copyDashboard(dashboardUuid));
            const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
            const { success } = dashboardState.dashboardCopied;

            if (success) {
                await dispatch(fetchMyDashboards());
                dispatch(setNotificationState({
                    type: 'success',
                    message: 'Successfully copied the dashboard.'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    message: 'Failed to copy the dashboard.'
                }));
            }
        })();
    };
};

export {
    copyDashboardAndFetchMyDashboards
};
