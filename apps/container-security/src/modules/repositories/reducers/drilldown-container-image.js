import { SET_DRILLDOWN_CONTAINER_IMAGE } from '../actions/types';

const drilldownContainerImage = (state = null, action) => {
    switch (action.type) {
        case SET_DRILLDOWN_CONTAINER_IMAGE:
            return action.payload;
        default:
            return state;
    }
};

export {
    drilldownContainerImage
};
