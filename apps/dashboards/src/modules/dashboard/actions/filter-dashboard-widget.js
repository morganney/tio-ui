import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    FILTER_DASHBOARD_WIDGET_REQUEST,
    FILTER_DASHBOARD_WIDGET_SUCCESS,
    FILTER_DASHBOARD_WIDGET_ERROR
} from './types';

const filterDashboardWidget = (dashboardUuid, widgetUuid, payload = {}) => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                FILTER_DASHBOARD_WIDGET_REQUEST,
                FILTER_DASHBOARD_WIDGET_SUCCESS,
                FILTER_DASHBOARD_WIDGET_ERROR
            ],
            request: {
                url: `/dashboards/custom/${dashboardUuid}/component/${widgetUuid}`,
                method: 'PATCH',
                body: payload,
                ignoreResponseBody: true
            }
        }
    };
};

export {
    filterDashboardWidget
};
