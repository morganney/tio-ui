import { LOCATION_CHANGE } from 'react-router-redux';

import * as reducers from '../reducers';
import { LOG_IN_ERROR } from '../actions/log-in-error';
import { LOG_IN_REQUEST } from '../actions/log-in-request';
import { LOG_IN_SUCCESS } from '../actions/log-in-success';

const dummyStore = {};

describe('Login Reducers', () => {
    describe('Error Reducer', () => {
        it('Should return initial state', () => {
            const initialState = {
                network: ''
            };

            expect(reducers.networkError(dummyStore.state, {})).toEqual(initialState);
        });

        it('Should handle LOGIN_ERROR', () => {
            const initialState = {
                network: ''
            };
            const action = {
                type: LOG_IN_ERROR,
                error: 'failed to login'
            };
            const expectedState = {
                network: 'failed to login'
            };

            expect(reducers.networkError(initialState, action)).toEqual(expectedState);
        });

        it('Should handle LOG_IN_SUCCESS', () => {
            const initialState = {
                network: ''
            };
            const action = {
                type: LOG_IN_SUCCESS,
                payload: 'mysessiontoken'
            };
            const expectedState = {
                network: ''
            };

            expect(reducers.networkError(initialState, action)).toEqual(expectedState);
        });

        it('Should handle LOCATION_CHANGE', () => {
            const initialState = {
                network: ''
            };
            const action = {
                type: LOCATION_CHANGE
            };
            const expectedState = {
                network: ''
            };

            expect(reducers.networkError(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Fetching Reducer', () => {
        it('Should return initialState', () => {
            expect(reducers.fetching(dummyStore.state, {})).toEqual(false);
        });

        it('Should handle LOG_IN_REQUEST', () => {
            const initialState = false;
            const action = {
                type: LOG_IN_REQUEST,
                payload: {
                    username: 'admin',
                    password: 'TenableAdmin'
                }
            };
            const expectedState = true;

            expect(reducers.fetching(initialState, action)).toEqual(expectedState);
        });

        it('Should handle LOG_IN_SUCCESS', () => {
            const initialState = true;
            const action = {
                type: LOG_IN_SUCCESS,
                meta: { domain: 'login' },
                payload: 'mysessiontoken'
            };
            const expectedState = false;

            expect(reducers.fetching(initialState, action)).toEqual(expectedState);
        });

        it('Should handle LOG_IN_ERROR', () => {
            const initialState = true;
            const action = {
                type: LOG_IN_ERROR,
                meta: { domain: 'login' },
                error: new Error()
            };
            const expectedState = false;

            expect(reducers.fetching(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Token Reducer', () => {
        it('Should return initial state', () => {
            expect(reducers.token(dummyStore.state, {})).toEqual('');
        });

        it('Should handle LOG_IN_SUCCESS', () => {
            const initialState = '';
            const action = {
                type: LOG_IN_SUCCESS,
                payload: 'mysessiontoken'
            };
            const expectedState = 'mysessiontoken';

            expect(reducers.token(initialState, action)).toEqual(expectedState);
        });
    });
});
