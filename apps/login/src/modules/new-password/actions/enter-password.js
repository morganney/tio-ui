export const ENTER_PASSWORD = 'new-password/enter-password';
export const enterPassword = (password) => {
    return {
        type: ENTER_PASSWORD,
        payload: password
    };
};
