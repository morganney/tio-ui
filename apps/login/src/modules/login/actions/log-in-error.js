export const LOG_IN_ERROR = 'login/error';
export const logInError = (error) => {
    return {
        type: LOG_IN_ERROR,
        error
    };
};
