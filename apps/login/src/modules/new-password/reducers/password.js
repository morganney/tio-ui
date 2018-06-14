import { ENTER_PASSWORD } from '../actions/enter-password';

const password = (state = '', action) => {
    switch (action.type) {
        case ENTER_PASSWORD:
            return action.payload;
        default:
            return state;
    }
};

export default password;
