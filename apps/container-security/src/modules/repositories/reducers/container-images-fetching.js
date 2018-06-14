import {
    CONTAINER_IMAGES_REQUEST,
    CONTAINER_IMAGES_SUCCESS,
    CONTAINER_IMAGES_ERROR
} from '../actions/types';

const containerImagesFetching = (state = false, action) => {
    switch (action.type) {
        case CONTAINER_IMAGES_REQUEST:
            return true;
        case CONTAINER_IMAGES_SUCCESS:
        case CONTAINER_IMAGES_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    containerImagesFetching
};
