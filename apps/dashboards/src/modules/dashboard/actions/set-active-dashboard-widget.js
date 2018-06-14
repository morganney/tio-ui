import { SET_ACTIVE_WIDGET } from './types';

const setActiveDashboardWidget = (widgetUuid) => {
    return {
        type: SET_ACTIVE_WIDGET,
        payload: widgetUuid
    };
};

export {
    setActiveDashboardWidget
};
