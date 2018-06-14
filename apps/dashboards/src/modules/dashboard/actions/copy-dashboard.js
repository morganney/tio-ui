import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    COPY_DASHBOARD_REQUEST,
    COPY_DASHBOARD_SUCCESS,
    COPY_DASHBOARD_ERROR
} from './types';

const copyDashboard = (dashboardUuid) => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                COPY_DASHBOARD_REQUEST,
                COPY_DASHBOARD_SUCCESS,
                COPY_DASHBOARD_ERROR
            ],
            request: {
                url: `/dashboards/custom/${dashboardUuid}/duplicate`,
                method: 'POST'
            }
        }
    };
};

export {
    copyDashboard
};
