import {
    newPasswordRequest,
    newPasswordSuccess,
    newPasswordError
} from '../index';
import { setNewPassword } from '../../services';

export const newPassword = (password, key) => {
    return (dispatch) => {
        (async () => {
            dispatch(newPasswordRequest());

            try {
                // Ignore the response
                await setNewPassword(password, key);
                dispatch(newPasswordSuccess());
            } catch (err) {
                dispatch(newPasswordError(err.message));
            }
        })();
    };
};
