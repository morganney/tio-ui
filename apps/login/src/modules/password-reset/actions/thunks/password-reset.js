import {
    passwordResetRequest,
    passwordResetSuccess,
    passwordResetError
} from '../index';
import { requestPasswordReset } from '../../services';

export const passwordReset = (username) => {
    return (dispatch) => {
        (async () => {
            dispatch(passwordResetRequest(username));

            try {
                await requestPasswordReset(username);
                dispatch(passwordResetSuccess());
            } catch (err) {
                dispatch(passwordResetError(err.message));
            }
        })();
    };
};
