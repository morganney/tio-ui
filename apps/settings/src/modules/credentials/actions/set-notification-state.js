import { SET_NOTIFICATION_STATE } from './types';

const setNotificationState = (payload) => {
    return {
        type: SET_NOTIFICATION_STATE,
        payload
    };
};

export {
    setNotificationState
};
