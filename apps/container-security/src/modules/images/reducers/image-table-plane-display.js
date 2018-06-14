import { TOGGLE_IMAGE_TABLE_PLANE } from '../actions/types';

const imageTablePlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_IMAGE_TABLE_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    imageTablePlaneDisplay
};
