import { SET_DETAIL_IMAGE_VULN } from '../actions/types';

const currentDetailImageVuln = (state = {}, action) => {
    switch (action.type) {
        case SET_DETAIL_IMAGE_VULN:
            return action.payload;
        default:
            return state;
    }
};

export {
    currentDetailImageVuln
};
