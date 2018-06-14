import { TOGGLE_CONTAINER_TAGS_TABLE_PLANE } from '../actions/types';

const containerTagsTablePlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_CONTAINER_TAGS_TABLE_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    containerTagsTablePlaneDisplay
};
