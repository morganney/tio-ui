export const ENTER_USERNAME = 'password-reset/enter-username';
export const enterUsername = (username) => {
    return {
        type: ENTER_USERNAME,
        payload: username
    };
};
