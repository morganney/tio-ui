import {
    IMAGE_VULNERABILITIES_SUCCESS,
    IMAGE_VULNERABILITIES_ERROR
} from '../actions/types';

const initialState = {};

const imageVulnerabilities = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_VULNERABILITIES_SUCCESS: {
            const { findings } = action.payload;
            let vulnerabilities = [];

            if (findings.length) {
                vulnerabilities = findings.map((item) => {
                    return item.nvdFinding;
                });
            }

            return {
                ...state,
                vulnerabilities,
                errorMessage: ''
            };
        }
        case IMAGE_VULNERABILITIES_ERROR: {
            return {
                ...state,
                errorMessage: 'There was an error in processing your request.'
            };
        }
        default:
            return state;
    }
};

export {
    imageVulnerabilities
};
