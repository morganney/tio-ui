export const LOG_IN_REQUEST = 'login/request';
export const logInRequest = (creds) => {
    return {
        type: LOG_IN_REQUEST,
        payload: creds
    };
};
