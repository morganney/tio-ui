import {
    IMAGE_REPORT_SUCCESS,
    IMAGE_REPORT_ERROR,
    IMAGE_REPORT_RESET
} from '../actions/types';

const initialState = {};

const imageReport = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_REPORT_SUCCESS: {
            return {
                ...state,
                payload: action.payload,
                errorMessage: ''
            };
        }
        case IMAGE_REPORT_ERROR: {
            return {
                ...state,
                payload: null,
                errorMessage: 'There was an error in processing your request.'
            };
        }
        case IMAGE_REPORT_RESET: {
            return initialState;
        }
        default:
            return state;
    }
};

export {
    imageReport
};
