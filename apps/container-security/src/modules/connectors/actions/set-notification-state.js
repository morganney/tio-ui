import { SET_NOTIFICATION_STATE } from './types';

const setNotificationState = (notificationOptions = {}) => {
    return {
        type: SET_NOTIFICATION_STATE,
        payload: notificationOptions
    };
};

export {
    setNotificationState
};
