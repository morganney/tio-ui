import {
    CONTAINER_TAGS_SUCCESS,
    CONTAINER_TAGS_ERROR
} from '../actions/types';

const containerTagsError = (state = false, action) => {
    switch (action.type) {
        case CONTAINER_TAGS_SUCCESS:
            return false;
        case CONTAINER_TAGS_ERROR:
            return 'genericApiError';
        default:
            return state;
    }
};

export {
    containerTagsError
};
