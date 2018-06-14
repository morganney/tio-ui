import { push } from 'react-router-redux';

import { Utils } from 'tio-alloy';
import { setDefaultDashboard } from 'tio-app/modules/session/actions';

import {
    deleteDashboard,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const deleteDashboardAndRouteToDefault = (dashboardUuid = null) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(deleteDashboard(dashboardUuid));
            const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
            const defaultDashboard = getState().core.session.userPreferences.defaultDashboard;
            let defaultRoute = `/${BRANCH_NAME}/vulnerability-management`;
            const { success } = dashboardState.dashboardDeleted;

            if (defaultDashboard) {
                defaultRoute = `/${BRANCH_NAME}/${defaultDashboard}`;
            }

            if (success) {
                if (dashboardUuid === defaultDashboard) {
                    Utils.storage.remove('defaultDashboard');
                    dispatch(setDefaultDashboard(null));

                    defaultRoute = `/${BRANCH_NAME}/vulnerability-management`;
                }
                dispatch(push(defaultRoute));
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
    deleteDashboardAndRouteToDefault
};
