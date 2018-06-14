import { LOCATION_CHANGE } from 'react-router-redux';

import * as reducers from '../reducers';
import { ENTER_PASSWORD } from '../actions/enter-password';
import { FOCUS_FORM_FIELD } from '../actions/focus-form-field';
import { VALIDATION_ERROR } from '../actions/validation-error';
import { NEW_PASSWORD_ERROR } from '../actions/new-password-error';
import { NEW_PASSWORD_REQUEST } from '../actions/new-password-request';
import { NEW_PASSWORD_SUCCESS } from '../actions/new-password-success';

const dummyStore = {};

describe('Login Reducers', () => {
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

        it('Should handle FOCUS_FORM_FIELD actions', () => {
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

        it('Should handle NEW_PASSWORD_ERROR actions', () => {
            const error = new Error();
            const initialState = {
                validation: {},
                network: ''
            };
            const action = {
                type: NEW_PASSWORD_ERROR,
                error
            };
            const expectedState = {
                validation: {},
                network: error
            };

            expect(reducers.errors(initialState, action)).toEqual(expectedState);
        });

        it('Should handle NEW_PASSWORD_SUCCESS actions', () => {
            const initialState = {
                validation: {},
                network: ''
            };
            const action = {
                type: NEW_PASSWORD_SUCCESS,
                meta: { domain: 'newPassword' }
            };
            const expectedState = {
                validation: {},
                network: ''
            };

            expect(reducers.errors(initialState, action)).toEqual(expectedState);
        });

        it('Should handle LOCATION_CHANGE actions', () => {
            const initialState = {
                validation: {},
                network: ''
            };
            const action = {
                type: LOCATION_CHANGE
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

        it('Should handle NEW_PASSWORD_REQUEST', () => {
            const initialState = false;
            const action = {
                type: NEW_PASSWORD_REQUEST,
                payload: 'admin'
            };
            const expectedState = true;

            expect(reducers.fetching(initialState, action)).toEqual(expectedState);
        });

        it('Should handle NEW_PASSWORD_SUCCESS', () => {
            const initialState = true;
            const action = {
                type: NEW_PASSWORD_SUCCESS,
                meta: { domain: 'passwordReset' }
            };
            const expectedState = false;

            expect(reducers.fetching(initialState, action)).toEqual(expectedState);
        });

        it('Should handle NEW_PASSWORD_ERROR', () => {
            const initialState = true;
            const action = {
                type: NEW_PASSWORD_ERROR,
                meta: { domain: 'passwordReset' },
                error: new Error()
            };
            const expectedState = false;

            expect(reducers.fetching(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Password Reducer', () => {
        it('Should return initial state', () => {
            expect(reducers.password(dummyStore.state, {})).toEqual('');
        });

        it('Should handle ENTER_PASSWORD', () => {
            const initialState = '';
            const action = {
                type: ENTER_PASSWORD,
                payload: 'TenableAdmin'
            };
            const expectedState = 'TenableAdmin';

            expect(reducers.password(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Reset Reducer', () => {
        it('Should handle NEW_PASSWORD_SUCCESS', () => {
            const initialState = false;
            const action = {
                type: NEW_PASSWORD_SUCCESS,
                meta: { domain: 'newPassword' }
            };
            const expectedState = true;

            expect(reducers.reset(initialState, action)).toEqual(expectedState);
        });
    });
});
