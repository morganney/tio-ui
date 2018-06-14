import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    MY_DASHBOARDS_REQUEST,
    MY_DASHBOARDS_SUCCESS,
    MY_DASHBOARDS_ERROR
} from './types';

const fetchMyDashboards = () => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                MY_DASHBOARDS_REQUEST,
                MY_DASHBOARDS_SUCCESS,
                MY_DASHBOARDS_ERROR
            ],
            request: `/dashboards/custom`
        }
    };
};

export { fetchMyDashboards };
