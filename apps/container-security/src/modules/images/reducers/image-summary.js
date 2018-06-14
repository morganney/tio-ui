import {
    IMAGE_SUMMARY_SUCCESS,
    IMAGE_SUMMARY_ERROR
} from '../actions/types';

const initialState = {};

const imageSummary = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_SUMMARY_SUCCESS: {
            return {
                ...state,
                payload: action.payload,
                errorMessage: ''
            };
        }
        case IMAGE_SUMMARY_ERROR: {
            return {
                ...state,
                payload: null,
                errorMessage: 'There was an error in processing your request.'
            };
        }
        default:
            return state;
    }
};

export {
    imageSummary
};
