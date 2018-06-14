import { push } from 'react-router-redux';

import {
    copyDashboard,
    setNotificationState,
    toggleDashboardPlane
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const copyDashboardAndRouteToNewUuid = (dashboardUuid = null) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(copyDashboard(dashboardUuid));
            const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
            const { success, data } = dashboardState.dashboardCopied;

            dispatch(toggleDashboardPlane('closed'));

            if (success) {
                await dispatch(push(`/${BRANCH_NAME}/${data.uuid}`));

                dispatch(toggleDashboardPlane('partial'));
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
    copyDashboardAndRouteToNewUuid
};
