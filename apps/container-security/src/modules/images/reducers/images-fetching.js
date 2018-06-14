import {
    IMAGES_REQUEST,
    IMAGES_SUCCESS,
    IMAGES_ERROR
} from '../actions/types';

const imagesFetching = (state = false, action) => {
    switch (action.type) {
        case IMAGES_REQUEST:
            return true;
        case IMAGES_SUCCESS:
        case IMAGES_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    imagesFetching
};
