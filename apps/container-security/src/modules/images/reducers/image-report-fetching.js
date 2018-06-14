import {
    IMAGE_REPORT_REQUEST,
    IMAGE_REPORT_SUCCESS,
    IMAGE_REPORT_ERROR,
    IMAGE_REPORT_RESET
} from '../actions/types';

const initialState = false;

const imageReportFetching = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_REPORT_REQUEST:
            return true;
        case IMAGE_REPORT_SUCCESS:
        case IMAGE_REPORT_ERROR:
        case IMAGE_REPORT_RESET:
            return false;
        default:
            return state;
    }
};

export {
    imageReportFetching
};
