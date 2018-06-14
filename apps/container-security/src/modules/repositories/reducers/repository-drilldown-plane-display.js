import { TOGGLE_REPOSITORY_DRILLDOWN_PLANE } from '../actions/types';

const repositoryDrilldownPlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_REPOSITORY_DRILLDOWN_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    repositoryDrilldownPlaneDisplay
};
