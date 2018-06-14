export const VALIDATION_ERROR = 'new-password/validation-error';
export const validationError = (error) => {
    return {
        type: VALIDATION_ERROR,
        error
    };
};
