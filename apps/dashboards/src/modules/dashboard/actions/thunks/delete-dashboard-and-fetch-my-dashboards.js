import { Utils } from 'tio-alloy';
import { setDefaultDashboard } from 'tio-app/modules/session/actions';

import {
    fetchMyDashboards,
    deleteDashboard,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const deleteDashboardAndFetchMyDashboards = (dashboardUuid = null) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(deleteDashboard(dashboardUuid));
            const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
            const defaultDashboard = getState().core.session.userPreferences.defaultDashboard;
            const { success } = dashboardState.dashboardDeleted;

            if (success) {
                await dispatch(fetchMyDashboards());

                if (dashboardUuid === defaultDashboard) {
                    Utils.storage.remove('defaultDashboard');
                    dispatch(setDefaultDashboard(null));
                }

                dispatch(setNotificationState({
                    type: 'success',
                    message: 'Dashboard successfully deleted.'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    message: 'Failed to delete the dashboard.'
                }));
            }
        })();
    };
};

export {
    deleteDashboardAndFetchMyDashboards
};
