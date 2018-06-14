import * as reducers from '../reducers';
import { ENTER_CAPTCHA_ANSWER } from '../actions/enter-captcha-answer';
import { ENTER_USERNAME } from '../actions/enter-username';
import { FOCUS_FORM_FIELD } from '../actions/focus-form-field';
import { PASSWORD_RESET_ERROR } from '../actions/password-reset-error';
import { PASSWORD_RESET_REQUEST } from '../actions/password-reset-request';
import { PASSWORD_RESET_SUCCESS } from '../actions/password-reset-success';
import { VALIDATION_ERROR } from '../actions/validation-error';

const dummyStore = {};

describe('Login Reducers', () => {
    describe('Captcha Reducer', () => {
        it('Should return initial state', () => {
            expect(reducers.captchaAnswer(dummyStore.state, {})).toEqual('');
        });

        it('Should handle ENTER_CAPTCHA_ANSWER', () => {
            const action = {
                type: ENTER_CAPTCHA_ANSWER,
                payload: 6
            };
            const expectedState = 6;

            expect(reducers.captchaAnswer(dummyStore.state, action)).toEqual(expectedState);
        });
    });

    describe('Error Reducer', () => {
        it('Should return initial state', () => {
            const initialState = {
                validation: {},
                network: ''
            };

            expect(reducers.errors(dummyStore.state, {})).toEqual(initialState);
        });

        it('Should handle VALIDATION_ERROR', () => {
            const initialState = {
                validation: {},
                network: ''
            };
            const action = {
                type: VALIDATION_ERROR,
                error: 'empty'
            };
            const expectedState = {
                validation: 'empty',
                network: ''
            };

            expect(reducers.errors(initialState, action)).toEqual(expectedState);
        });

        it('Should handle PASSWORD_RESET_ERROR', () => {
            const initialState = {
                validation: {},
                network: ''
            };
            const action = {
                type: PASSWORD_RESET_ERROR,
                error: 'failed to reset password'
            };
            const expectedState = {
                validation: {},
                network: 'failed to reset password'
            };

            expect(reducers.errors(initialState, action)).toEqual(expectedState);
        });

        it('Should handle FOCUS_FORM_FIELD errors', () => {
            const initialState = {
                validation: {},
                network: ''
            };
            const action = {
                type: FOCUS_FORM_FIELD,
                payload: 'password'
            };
            const expectedState = {
                validation: {
                    password: false
                },
                network: ''
            };

            expect(reducers.errors(initialState, action)).toEqual(expectedState);
        });

        it('Should handle PASSWORD_RESET_SUCCESS', () => {
            const initialState = {
                validation: {},
                network: ''
            };
            const action = {
                type: PASSWORD_RESET_SUCCESS,
                meta: { domain: 'passwordReset' }
            };
            const expectedState = {
                validation: {},
                network: ''
            };

            expect(reducers.errors(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Fetching Reducer', () => {
        it('Should return initialState', () => {
            expect(reducers.fetching(dummyStore.state, {})).toEqual(false);
        });

        it('Should handle PASSWORD_RESET_REQUEST', () => {
            const initialState = false;
            const action = {
                type: PASSWORD_RESET_REQUEST,
                payload: 'admin'
            };
            const expectedState = true;

            expect(reducers.fetching(initialState, action)).toEqual(expectedState);
        });

        it('Should handle PASSWORD_RESET_SUCCESS', () => {
            const initialState = true;
            const action = {
                type: PASSWORD_RESET_SUCCESS,
                meta: { domain: 'passwordReset' }
            };
            const expectedState = false;

            expect(reducers.fetching(initialState, action)).toEqual(expectedState);
        });

        it('Should handle PASSWORD_RESET_ERROR', () => {
            const initialState = true;
            const action = {
                type: PASSWORD_RESET_ERROR,
                meta: { domain: 'passwordReset' },
                error: new Error()
            };
            const expectedState = false;

            expect(reducers.fetching(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Password Reset Sent Reducer', () => {
        it('Should return initial state', () => {
            expect(reducers.sent(dummyStore.state, {})).toEqual(false);
        });

        it('Should handle PASSWORD_RESET_SUCCESS', () => {
            const initialState = false;
            const action = {
                type: PASSWORD_RESET_SUCCESS,
                meta: { domain: 'passwordReset' }
            };
            const expectedState = true;

            expect(reducers.sent(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Username Reducer', () => {
        it('Should return initial state', () => {
            expect(reducers.username(dummyStore.state, {})).toEqual('');
        });

        it('Should handle ENTER_USERNAME', () => {
            const initialState = '';
            const action = {
                type: ENTER_USERNAME,
                payload: 'admin'
            };
            const expectedState = 'admin';

            expect(reducers.username(initialState, action)).toEqual(expectedState);
        });
    });
});
