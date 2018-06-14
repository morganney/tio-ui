import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    ADD_DASHBOARD_TEMPLATE_REQUEST,
    ADD_DASHBOARD_TEMPLATE_SUCCESS,
    ADD_DASHBOARD_TEMPLATE_ERROR
} from './types';

const addDashboardTemplate = (dashboardUuid) => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                ADD_DASHBOARD_TEMPLATE_REQUEST,
                ADD_DASHBOARD_TEMPLATE_SUCCESS,
                ADD_DASHBOARD_TEMPLATE_ERROR
            ],
            request: {
                url: `/dashboards/custom/${dashboardUuid}/duplicate`,
                method: 'POST'
            }
        }
    };
};

export {
    addDashboardTemplate
};
