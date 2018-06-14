import {
    MY_DASHBOARDS_REQUEST,
    MY_DASHBOARDS_SUCCESS,
    MY_DASHBOARDS_ERROR
} from '../actions/types';

const fetchingMyDashboards = (state = false, action) => {
    switch (action.type) {
        case MY_DASHBOARDS_REQUEST:
            return true;
        case MY_DASHBOARDS_SUCCESS:
        case MY_DASHBOARDS_ERROR:
            return false;
        default:
            return state;
    }
};

export { fetchingMyDashboards };
