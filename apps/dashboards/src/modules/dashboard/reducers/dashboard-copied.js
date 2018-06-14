import {
    COPY_DASHBOARD_SUCCESS,
    COPY_DASHBOARD_ERROR,
    RESET_COPY_DASHBOARD
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};

const dashboardCopied = (state = initialState, action) => {
    switch (action.type) {
        case COPY_DASHBOARD_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case COPY_DASHBOARD_ERROR:
            return {
                success: false,
                data: action.payload
            };
        case RESET_COPY_DASHBOARD:
            return initialState;
        default:
            return state;
    }
};

export {
    dashboardCopied
};
