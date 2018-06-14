import { SET_ACTIVE_WIDGET } from '../actions/types';

const dashboardWidgetActive = (state = '', action) => {
    switch (action.type) {
        case SET_ACTIVE_WIDGET:
            return action.payload;
        default:
            return state;
    }
};

export {
    dashboardWidgetActive
};
