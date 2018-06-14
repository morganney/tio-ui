import { NEW_PASSWORD_SUCCESS } from '../actions/new-password-success';

const reset = (state = false, action) => {
    switch (action.type) {
        case NEW_PASSWORD_SUCCESS:
            return true;
        default:
            return state;
    }
};

export default reset;
