import { ENTER_PASSWORD, enterPassword } from '../actions/enter-password';
import { FOCUS_FORM_FIELD, focusFormField } from '../actions/focus-form-field';
import { VALIDATION_ERROR, validationError } from '../actions/validation-error';
import { NEW_PASSWORD_ERROR, newPasswordError } from '../actions/new-password-error';
import { NEW_PASSWORD_REQUEST, newPasswordRequest } from '../actions/new-password-request';
import { NEW_PASSWORD_SUCCESS, newPasswordSuccess } from '../actions/new-password-success';

describe('New Password Module Actions', () => {
    it('Should create an action to enter a password', () => {
        const password = 'TenableAdmin';
        const expectedAction = {
            type: ENTER_PASSWORD,
            payload: password
        };

        expect(enterPassword(password)).toEqual(expectedAction);
    });

    it('Should create an action when a form field is focussed', () => {
        const name = 'username';
        const expectedAction = {
            type: FOCUS_FORM_FIELD,
            payload: name
        };

        expect(focusFormField(name)).toEqual(expectedAction);
    });

    it('Should create an action when there is a form validation error', () => {
        const error = new Error();
        const expectedAction = {
            type: VALIDATION_ERROR,
            error
        };

        expect(validationError(error)).toEqual(expectedAction);
    });

    it('Should create an action when there is a new password error', () => {
        const error = new Error();
        const expectedAction = {
            type: NEW_PASSWORD_ERROR,
            error
        };

        expect(newPasswordError(error)).toEqual(expectedAction);
    });

    it('Should create an action when there is a new password request', () => {
        const expectedAction = {
            type: NEW_PASSWORD_REQUEST
        };

        expect(newPasswordRequest()).toEqual(expectedAction);
    });

    it('Should create an action when there is a new password success', () => {
        const expectedAction = {
            type: NEW_PASSWORD_SUCCESS,
            meta: { domain: 'newPassword' }
        };

        expect(newPasswordSuccess()).toEqual(expectedAction);
    });
});
