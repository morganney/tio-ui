import { ENTER_CAPTCHA_ANSWER, enterCaptchaAnswer } from '../actions/enter-captcha-answer';
import { ENTER_USERNAME, enterUsername } from '../actions/enter-username';
import { FOCUS_FORM_FIELD, focusFormField } from '../actions/focus-form-field';
import { PASSWORD_RESET_ERROR, passwordResetError } from '../actions/password-reset-error';
import { PASSWORD_RESET_REQUEST, passwordResetRequest } from '../actions/password-reset-request';
import { PASSWORD_RESET_SUCCESS, passwordResetSuccess } from '../actions/password-reset-success';
import { VALIDATION_ERROR, validationError } from '../actions/validation-error';

describe('Password Reset Actions', () => {
    it('Should create an action to enter a captcha answer', () => {
        const answer = 6;
        const expectedAction = {
            type: ENTER_CAPTCHA_ANSWER,
            payload: answer
        };

        expect(enterCaptchaAnswer(answer)).toEqual(expectedAction);
    });

    it('Should create an action to enter a username', () => {
        const username = 'admin';
        const expectedAction = {
            type: ENTER_USERNAME,
            payload: username
        };

        expect(enterUsername(username)).toEqual(expectedAction);
    });

    it('Should create an action when a form field is focussed', () => {
        const name = 'username';
        const expectedAction = {
            type: FOCUS_FORM_FIELD,
            payload: name
        };

        expect(focusFormField(name)).toEqual(expectedAction);
    });

    it('Should create an action when there is a password reset error', () => {
        const error = new Error();
        const expectedAction = {
            type: PASSWORD_RESET_ERROR,
            error
        };

        expect(passwordResetError(error)).toEqual(expectedAction);
    });

    it('Should create an action when there is a password reset request', () => {
        const username = 'admin';
        const expectedAction = {
            type: PASSWORD_RESET_REQUEST,
            payload: username
        };

        expect(passwordResetRequest(username)).toEqual(expectedAction);
    });

    it('Should create an action when there is successful password reset', () => {
        const expectedAction = {
            type: PASSWORD_RESET_SUCCESS,
            meta: { domain: 'passwordReset' }
        };

        expect(passwordResetSuccess()).toEqual(expectedAction);
    });

    it('Should create an action when there is a form validation error', () => {
        const error = new Error();
        const expectedAction = {
            type: VALIDATION_ERROR,
            error
        };

        expect(validationError(error)).toEqual(expectedAction);
    });
});
