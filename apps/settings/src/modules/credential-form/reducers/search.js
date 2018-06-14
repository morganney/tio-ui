import { SET_SEARCH } from '../actions/types';

const search = (state = '', action) => {
    switch (action.type) {
        case SET_SEARCH:
            return action.payload;
        default:
            return state;
    }
};

export {
    search
};
