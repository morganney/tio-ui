import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    DELETE_DASHBOARD_REQUEST,
    DELETE_DASHBOARD_SUCCESS,
    DELETE_DASHBOARD_ERROR
} from './types';

const deleteDashboard = (dashboardUuid) => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                DELETE_DASHBOARD_REQUEST,
                DELETE_DASHBOARD_SUCCESS,
                DELETE_DASHBOARD_ERROR
            ],
            request: {
                url: `/dashboards/custom/${dashboardUuid}`,
                method: 'DELETE',
                ignoreResponseBody: true
            }
        }
    };
};

export {
    deleteDashboard
};
