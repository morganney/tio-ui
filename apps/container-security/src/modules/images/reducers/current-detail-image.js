import { SET_DETAIL_IMAGE } from '../actions/types';

const currentDetailImage = (state = {}, action) => {
    switch (action.type) {
        case SET_DETAIL_IMAGE:
            return action.payload;
        default:
            return state;
    }
};

export {
    currentDetailImage
};
