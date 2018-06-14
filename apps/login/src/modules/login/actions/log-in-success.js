export const LOG_IN_SUCCESS = 'login/success';
export const logInSuccess = (token) => {
    return {
        type: LOG_IN_SUCCESS,
        meta: { domain: 'login' },
        payload: token
    };
};
