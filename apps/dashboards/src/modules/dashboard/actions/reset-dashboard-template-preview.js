import { RESET_DASHBOARD_TEMPLATE_PREVIEW } from './types';

const resetDashboardTemplatePreview = () => {
    return {
        type: RESET_DASHBOARD_TEMPLATE_PREVIEW,
        payload: {}
    };
};

export { resetDashboardTemplatePreview };
