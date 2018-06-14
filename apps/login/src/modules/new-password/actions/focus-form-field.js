export const FOCUS_FORM_FIELD = 'new-password/focus-form-field';
export const focusFormField = (name) => {
    return {
        type: FOCUS_FORM_FIELD,
        payload: name
    };
};
