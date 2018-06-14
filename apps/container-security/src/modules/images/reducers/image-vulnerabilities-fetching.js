import {
    IMAGE_VULNERABILITIES_REQUEST,
    IMAGE_VULNERABILITIES_SUCCESS,
    IMAGE_VULNERABILITIES_ERROR
} from '../actions/types';

const initialState = false;

const isImageVulnerabilitiesFetching = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_VULNERABILITIES_REQUEST:
            return true;
        case IMAGE_VULNERABILITIES_SUCCESS:
        case IMAGE_VULNERABILITIES_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    isImageVulnerabilitiesFetching
};
