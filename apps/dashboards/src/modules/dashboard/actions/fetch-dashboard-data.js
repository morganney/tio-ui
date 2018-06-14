import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    DASHBOARD_DATA_REQUEST,
    DASHBOARD_DATA_SUCCESS,
    DASHBOARD_DATA_ERROR
} from './types';

const fetchDashboardData = (uuid) => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                DASHBOARD_DATA_REQUEST,
                DASHBOARD_DATA_SUCCESS,
                DASHBOARD_DATA_ERROR
            ],
            request: `/dashboards/custom/${uuid}`
        }
    };
};

export { fetchDashboardData };
