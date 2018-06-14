export const PASSWORD_RESET_SUCCESS = 'password-reset/success';
export const passwordResetSuccess = () => {
    return {
        type: PASSWORD_RESET_SUCCESS,
        meta: { domain: 'passwordReset' }
    };
};
