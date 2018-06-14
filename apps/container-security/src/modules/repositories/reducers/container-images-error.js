import {
    CONTAINER_IMAGES_SUCCESS,
    CONTAINER_IMAGES_ERROR
} from '../actions/types';

const containerImagesError = (state = false, action) => {
    switch (action.type) {
        case CONTAINER_IMAGES_SUCCESS:
            return false;
        case CONTAINER_IMAGES_ERROR:
            return 'genericApiError';
        default:
            return state;
    }
};

export {
    containerImagesError
};
