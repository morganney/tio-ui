import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    DASHBOARD_TEMPLATES_REQUEST,
    DASHBOARD_TEMPLATES_SUCCESS,
    DASHBOARD_TEMPLATES_ERROR
} from './types';

const fetchDashboardTemplates = () => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                DASHBOARD_TEMPLATES_REQUEST,
                DASHBOARD_TEMPLATES_SUCCESS,
                DASHBOARD_TEMPLATES_ERROR
            ],
            request: `/dashboards/templates?categoryId=all`
        }
    };
};

export { fetchDashboardTemplates };
