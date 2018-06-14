import { SET_DEFAULT_DASHBOARD } from './types';

const setDefaultDashboard = (uuid) => {
    return {
        type: SET_DEFAULT_DASHBOARD,
        payload: uuid
    };
};

export {
    setDefaultDashboard
};
