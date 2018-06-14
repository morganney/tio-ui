import { logInRequest, logInSuccess, logInError } from '../index';
import { login } from '../../services';

export const logIn = (creds) => {
    return (dispatch) => {
        /**
         * Use async IIFE to benefit from try/catch over then().catch() for
         * error handling.
         */
        (async () => {
            dispatch(logInRequest(creds));

            try {
                const { token } = await login(creds);

                dispatch(logInSuccess(token));
            } catch (err) {
                dispatch(logInError(err.message));
            }
        })();
    };
};
