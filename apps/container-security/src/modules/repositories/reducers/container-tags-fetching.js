import {
    CONTAINER_TAGS_REQUEST,
    CONTAINER_TAGS_SUCCESS,
    CONTAINER_TAGS_ERROR
} from '../actions/types';

const containerTagsFetching = (state = false, action) => {
    switch (action.type) {
        case CONTAINER_TAGS_REQUEST:
            return true;
        case CONTAINER_TAGS_SUCCESS:
        case CONTAINER_TAGS_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    containerTagsFetching
};
