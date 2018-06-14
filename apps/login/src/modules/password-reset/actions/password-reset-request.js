export const PASSWORD_RESET_REQUEST = 'password-reset/request';
export const passwordResetRequest = (username) => {
    return {
        type: PASSWORD_RESET_REQUEST,
        payload: username
    };
};
