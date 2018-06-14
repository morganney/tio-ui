export const NEW_PASSWORD_SUCCESS = 'new-password/success';
export const newPasswordSuccess = () => {
    return {
        type: NEW_PASSWORD_SUCCESS,
        meta: { domain: 'newPassword' }
    };
};
