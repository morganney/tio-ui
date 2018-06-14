import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    COPY_DASHBOARD_WIDGET_REQUEST,
    COPY_DASHBOARD_WIDGET_SUCCESS,
    COPY_DASHBOARD_WIDGET_ERROR
} from './types';

const copyDashboardWidget = (dashboardUuid, widgetUuid) => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                COPY_DASHBOARD_WIDGET_REQUEST,
                COPY_DASHBOARD_WIDGET_SUCCESS,
                COPY_DASHBOARD_WIDGET_ERROR
            ],
            request: {
                url: `/dashboards/custom/${dashboardUuid}/component/${widgetUuid}/duplicate`,
                method: 'POST'
            }
        }
    };
};

export {
    copyDashboardWidget
};
