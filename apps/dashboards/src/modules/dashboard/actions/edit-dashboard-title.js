import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    EDIT_DASHBOARD_TITLE_REQUEST,
    EDIT_DASHBOARD_TITLE_SUCCESS,
    EDIT_DASHBOARD_TITLE_ERROR
} from './types';

const editDashboardTitle = (dashboardUuid, updatedTitle) => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                EDIT_DASHBOARD_TITLE_REQUEST,
                EDIT_DASHBOARD_TITLE_SUCCESS,
                EDIT_DASHBOARD_TITLE_ERROR
            ],
            request: {
                url: `/dashboards/custom/${dashboardUuid}`,
                method: 'PATCH',
                body: {
                    name: updatedTitle
                },
                ignoreResponseBody: true
            }
        }
    };
};

export {
    editDashboardTitle
};
