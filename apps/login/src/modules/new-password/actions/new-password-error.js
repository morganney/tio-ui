export const NEW_PASSWORD_ERROR = 'new-password/error';
export const newPasswordError = (error) => {
    return {
        type: NEW_PASSWORD_ERROR,
        error
    };
};
