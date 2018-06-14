import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    DASHBOARD_TEMPLATE_PREVIEW_REQUEST,
    DASHBOARD_TEMPLATE_PREVIEW_SUCCESS,
    DASHBOARD_TEMPLATE_PREVIEW_ERROR
} from './types';

const fetchDashboardTemplatePreview = (uuid) => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                DASHBOARD_TEMPLATE_PREVIEW_REQUEST,
                DASHBOARD_TEMPLATE_PREVIEW_SUCCESS,
                DASHBOARD_TEMPLATE_PREVIEW_ERROR
            ],
            request: `/dashboards/custom/${uuid}`
        }
    };
};

export { fetchDashboardTemplatePreview };
