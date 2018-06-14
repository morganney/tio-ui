export const VALIDATION_ERROR = 'password-reset/validation-error';
export const validationError = (error) => {
    return {
        type: VALIDATION_ERROR,
        error
    };
};
