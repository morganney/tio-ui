import {
    EDIT_DASHBOARD_TITLE_SUCCESS,
    EDIT_DASHBOARD_TITLE_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};

const dashboardTitleEdited = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_DASHBOARD_TITLE_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case EDIT_DASHBOARD_TITLE_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    dashboardTitleEdited
};
