import { TOGGLE_DETAIL_IMAGE_PLANE } from '../actions/types';

const imagesTableDetailPlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_DETAIL_IMAGE_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    imagesTableDetailPlaneDisplay
};
