import { MY_DASHBOARDS_SUCCESS } from '../actions/types';

const dashboards = (state = [], action) => {
    switch (action.type) {
        case MY_DASHBOARDS_SUCCESS:
            return action.payload.dashboards;
        default:
            return state;
    }
};

export { dashboards };
