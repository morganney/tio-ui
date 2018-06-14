import {
    IMAGE_SUMMARY_REQUEST,
    IMAGE_SUMMARY_SUCCESS,
    IMAGE_SUMMARY_ERROR
} from '../actions/types';

const initialState = false;

const isImageSummaryFetching = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_SUMMARY_REQUEST:
            return true;
        case IMAGE_SUMMARY_SUCCESS:
        case IMAGE_SUMMARY_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    isImageSummaryFetching
};
