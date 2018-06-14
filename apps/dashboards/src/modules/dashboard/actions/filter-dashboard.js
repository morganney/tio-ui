import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    FILTER_DASHBOARD_REQUEST,
    FILTER_DASHBOARD_SUCCESS,
    FILTER_DASHBOARD_ERROR
} from './types';

const filterDashboard = (dashboardUuid, payload = {}) => {
    const url = `/dashboards/custom/${dashboardUuid}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                FILTER_DASHBOARD_REQUEST,
                FILTER_DASHBOARD_SUCCESS,
                FILTER_DASHBOARD_ERROR
            ],
            request: {
                url,
                method: 'PATCH',
                body: payload,
                ignoreResponseBody: true
            }
        }
    };
};

export {
    filterDashboard
};
