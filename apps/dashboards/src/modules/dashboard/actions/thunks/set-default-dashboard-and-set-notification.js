import { Utils } from 'tio-alloy';
import { setDefaultDashboard } from 'tio-app/modules/session/actions';

import { setNotificationState } from '../';

const setDefaultDashboardAndSetNotification = (uuid) => {
    return (dispatch) => {
        Utils.storage.set('defaultDashboard', uuid);
        dispatch(setDefaultDashboard(uuid));

        dispatch(setNotificationState({
            type: 'success',
            message: 'Successfully set as default dashboard.'
        }));
    };
};

export {
    setDefaultDashboardAndSetNotification
};
