import { FETCH_DEFAULT_DASHBOARD } from '../actions/types';
import { DEFAULT_UUID } from '../constants';

const defaultDashboard = (state = DEFAULT_UUID, action) => {
    switch (action.type) {
        case FETCH_DEFAULT_DASHBOARD:
            return action.payload;
        default:
            return state;
    }
};

export {
    defaultDashboard
};
