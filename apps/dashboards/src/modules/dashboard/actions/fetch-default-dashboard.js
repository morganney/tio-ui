import { Utils } from 'tio-alloy';

import { FETCH_DEFAULT_DASHBOARD } from './types';

const fetchDefaultDashboard = () => {
    return {
        type: FETCH_DEFAULT_DASHBOARD,
        payload: Utils.storage.get('defaultDashboard')
    };
};

export {
    fetchDefaultDashboard
};
