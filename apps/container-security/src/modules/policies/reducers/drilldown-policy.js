import { SET_DRILLDOWN_POLICY } from '../actions/types';

const drilldownPolicy = (state = null, action) => {
    switch (action.type) {
        case SET_DRILLDOWN_POLICY:
            return action.payload;
        default:
            return state;
    }
};

export {
    drilldownPolicy
};
