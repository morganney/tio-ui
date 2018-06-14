export const FOCUS_FORM_FIELD = 'password-reset/focus-form-field';
export const focusFormField = (name) => {
    return {
        type: FOCUS_FORM_FIELD,
        payload: name
    };
};
