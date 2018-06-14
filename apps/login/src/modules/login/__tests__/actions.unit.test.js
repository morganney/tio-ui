import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { logIn } from '../actions/thunks/log-in';
import { LOG_IN_ERROR, logInError } from '../actions/log-in-error';
import { LOG_IN_REQUEST, logInRequest } from '../actions/log-in-request';
import { LOG_IN_SUCCESS, logInSuccess } from '../actions/log-in-success';

describe('Login Module Actions', () => {
    it('Should create an action when there is a log in error', () => {
        const error = new Error();
        const expectedAction = {
            type: LOG_IN_ERROR,
            error
        };

        expect(logInError(error)).toEqual(expectedAction);
    });

    it('Should create an action when there is a log in request', () => {
        const creds = {
            username: 'admin',
            password: 'TenableAdmin'
        };
        const expectedAction = {
            type: LOG_IN_REQUEST,
            payload: creds
        };

        expect(logInRequest(creds)).toEqual(expectedAction);
    });

    it('Should create an action when there is a successful login', () => {
        const token = 'myJestToken';
        const expectedAction = {
            type: LOG_IN_SUCCESS,
            meta: { domain: 'login' },
            payload: token
        };

        expect(logInSuccess(token)).toEqual(expectedAction);
    });
});

describe('async actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const creds = {
        username: 'admin',
        password: 'TenableAdmin'
    };

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    describe('async login actions', () => {
        it('created LOG_IN_REQUEST and LOG_IN_SUCCESS when we successfully login', async (done) => {
            // Our rest logic uses the new Headers global of the fetch implementation. because we dont actually need to set headers for calls to login I can mock this as a function that merely returns an object to avoid "Headers is undefined" errors. We may need to dig deeper into mocking this in the future.
            window.Headers = () => { return {}; };

            fetchMock.post('/session', {
                body: {
                    token: 'myJestToken'
                },
                headers: {
                    'content-type': 'application/json'
                }
            });

            const expectedActions = [
                {
                    type: LOG_IN_REQUEST,
                    payload: creds
                },
                {
                    type: LOG_IN_SUCCESS,
                    meta: { domain: 'login' },
                    payload: 'myJestToken'
                }
            ];

            const store = mockStore({ token: '' });

            await store.dispatch(logIn(creds));

            setTimeout(function () {
                expect(store.getActions()).toEqual(expectedActions);
                done();
            }, 0);
        });

        it('created LOG_IN_REQUEST and LOG_IN_ERROR when the AJAX call fails', async () => {
            // Our rest logic uses the new Headers global of the fetch implementation. because we dont actually need to set headers for calls to login I can mock this as a function that merely returns an object to avoid "Headers is undefined" errors. We may need to dig deeper into mocking this in the future.
            window.Headers = () => { return {}; };

            fetchMock.post('session', {
                body: {
                    token: 'myJestToken'
                },
                headers: {
                    'content-type': 'application/json'
                }
            });

            const expectedActions = [
                {
                    type: LOG_IN_REQUEST,
                    payload: creds
                },
                {
                    type: LOG_IN_ERROR,
                    error: 'No fallback response defined for POST to /session'
                }
            ];

            const store = mockStore({ token: '' });

            await store.dispatch(logIn(creds));

            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
