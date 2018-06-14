import { PASSWORD_RESET_SUCCESS } from '../actions/password-reset-success';

const sent = (state = false, action) => {
    switch (action.type) {
        case PASSWORD_RESET_SUCCESS:
            return true;
        default:
            return state;
    }
};

export default sent;
