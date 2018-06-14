export const PASSWORD_RESET_ERROR = 'password-reset/error';
export const passwordResetError = (error) => {
    return {
        type: PASSWORD_RESET_ERROR,
        error
    };
};
