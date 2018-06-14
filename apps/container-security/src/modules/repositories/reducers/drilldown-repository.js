import { SET_DRILLDOWN_REPOSITORY } from '../actions/types';

const drilldownRepository = (state = null, action) => {
    switch (action.type) {
        case SET_DRILLDOWN_REPOSITORY:
            return action.payload;
        default:
            return state;
    }
};

export {
    drilldownRepository
};
