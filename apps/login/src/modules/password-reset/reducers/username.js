import { ENTER_USERNAME } from '../actions/enter-username';

const username = (state = '', action) => {
    switch (action.type) {
        case ENTER_USERNAME:
            return action.payload;
        default:
            return state;
    }
};

export default username;
