import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    DELETE_DASHBOARD_WIDGET_REQUEST,
    DELETE_DASHBOARD_WIDGET_SUCCESS,
    DELETE_DASHBOARD_WIDGET_ERROR
} from './types';

const deleteDashboardWidget = (dashboardUuid, componentUuid) => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                DELETE_DASHBOARD_WIDGET_REQUEST,
                DELETE_DASHBOARD_WIDGET_SUCCESS,
                DELETE_DASHBOARD_WIDGET_ERROR
            ],
            request: {
                url: `/dashboards/custom/${dashboardUuid}/component/${componentUuid}`,
                method: 'DELETE',
                ignoreResponseBody: true
            }
        }
    };
};

export {
    deleteDashboardWidget
};
