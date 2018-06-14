import {
    credentialsFetching,
    credentials,
    credentialsFilters,
    credentialsFetchOptions,
    credentialCrudAction,
    notificationState
} from './../reducers';
import * as actions from './../actions';

import * as credentialFormActions from '../../credential-form/actions';

describe('Settings - Credentials Module Reducers', () => {
    describe('Credentials Fetching', () => {
        const {
            GET_CREDENTIALS_REQUEST,
            GET_CREDENTIALS_SUCCESS,
            GET_CREDENTIALS_ERROR,
            DELETE_CREDENTIAL_REQUEST,
            DELETE_CREDENTIAL_SUCCESS,
            DELETE_CREDENTIAL_ERROR
        } = actions.types;
        const {
            CREATE_CREDENTIAL_REQUEST,
            CREATE_CREDENTIAL_SUCCESS,
            CREATE_CREDENTIAL_ERROR
        } = credentialFormActions.types;

        it('should set credentialsFetching flag to true during get credentials request', () => {
            const expectedState = true;
            const actualState = credentialsFetching(false, {
                type: GET_CREDENTIALS_REQUEST
            });

            expect(actualState).toEqual(expectedState);
        });

        it('should set credentialsFetching flag to false on get credentials success', () => {
            const expectedState = false;
            const actualState = credentialsFetching(true, {
                type: GET_CREDENTIALS_SUCCESS
            });

            expect(actualState).toEqual(expectedState);
        });

        it('should set credentialsFetching flag to false on get credentials failure', () => {
            const expectedState = false;
            const actualState = credentialsFetching(true, {
                type: GET_CREDENTIALS_ERROR
            });

            expect(actualState).toEqual(expectedState);
        });

        it('should set credentialsFetching flag to true during create credential request', () => {
            const expectedState = true;
            const actualState = credentialsFetching(false, {
                type: CREATE_CREDENTIAL_REQUEST
            });

            expect(actualState).toEqual(expectedState);
        });

        it('should set credentialsFetching flag to false on create credential success', () => {
            const expectedState = false;
            const actualState = credentialsFetching(true, {
                type: CREATE_CREDENTIAL_SUCCESS
            });

            expect(actualState).toEqual(expectedState);
        });

        it('should set credentialsFetching flag to false on create credential failure', () => {
            const expectedState = false;
            const actualState = credentialsFetching(true, {
                type: CREATE_CREDENTIAL_ERROR
            });

            expect(actualState).toEqual(expectedState);
        });

        it('should set credentialsFetching to true when DELETE_CREDENTIAL_REQUEST is called', () => {
            const expectedState = true;

            const actualState = credentialsFetching(null, {
                type: DELETE_CREDENTIAL_REQUEST
            });

            expect(actualState).toEqual(expectedState);
        });

        it('should set credentialsFetching to false when DELETE_CREDENTIAL_ERROR is called', () => {
            const expectedState = false;

            const actualState = credentialsFetching(null, {
                type: DELETE_CREDENTIAL_SUCCESS
            });

            expect(actualState).toEqual(expectedState);
        });

        it('should set credentialsFetching to false when DELETE_CREDENTIAL_ERROR is called', () => {
            const expectedState = false;

            const actualState = credentialsFetching(null, {
                type: DELETE_CREDENTIAL_ERROR
            });

            expect(actualState).toEqual(expectedState);
        });
    });

    describe('Credentials Table', () => {
        const { GET_CREDENTIALS_SUCCESS } = actions.types;

        it('should set credentials and pagination properly if fetchCredentials is successful', () => {
            const expectedState = {
                credentials: [{
                    hey: 'dude'
                }],
                pagination: {
                    whats: 'up'
                }
            };

            const actualState = credentials(null, {
                type: GET_CREDENTIALS_SUCCESS,
                payload: expectedState
            });

            expect(actualState).toEqual(expectedState);
        });
    });

    describe('Credentials Filters', () => {
        const { GET_CREDENTIALS_FILTERS_SUCCESS } = actions.types;

        it('should set credentials filters if fetchCredentialsFilters is successful', () => {
            const expectedState = {
                filters: [{
                    name: 'Brita'
                }],
                wildcardFields: [
                    'uno'
                ],
                sort: [
                    'ie'
                ]
            };

            const actualState = credentialsFilters(null, {
                type: GET_CREDENTIALS_FILTERS_SUCCESS,
                payload: expectedState
            });

            expect(actualState).toEqual(expectedState);
        });
    });

    describe('Credentials Fetch Options', () => {
        const { SET_CREDENTIALS_FETCH_OPTIONS } = actions.types;

        it('should set credentials fetch options properly', () => {
            const expectedState = {
                offset: 50,
                limit: 100,
                sorts: [{
                    name: 'name',
                    order: 'asc'
                }],
                filters: [],
                search: 'waldo'
            };

            const actualState = credentialsFetchOptions(null, {
                type: SET_CREDENTIALS_FETCH_OPTIONS,
                payload: expectedState
            });

            expect(actualState).toEqual(expectedState);
        });
    });

    describe('Crud Actions', () => {
        const {
            DELETE_CREDENTIAL_REQUEST,
            DELETE_CREDENTIAL_SUCCESS,
            DELETE_CREDENTIAL_ERROR
        } = actions.types;
        const {
            CREATE_CREDENTIAL_REQUEST,
            CREATE_CREDENTIAL_SUCCESS,
            CREATE_CREDENTIAL_ERROR,
            EDIT_CREDENTIAL_REQUEST,
            EDIT_CREDENTIAL_SUCCESS,
            EDIT_CREDENTIAL_ERROR
        } = credentialFormActions.types;

        it('should save a create credential request by marking it as running action', () => {
            const expectedState = {
                action: CREATE_CREDENTIAL_REQUEST,
                running: true
            };
            const actualState = credentialCrudAction(null, {
                type: CREATE_CREDENTIAL_REQUEST
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should save a create credential success by marking it as completed, successful, and storing it', () => {
            const payload = {
                uuid: 'abc123'
            };
            const expectedState = {
                action: CREATE_CREDENTIAL_SUCCESS,
                running: false,
                success: true,
                response: payload
            };
            const actualState = credentialCrudAction(null, {
                type: CREATE_CREDENTIAL_SUCCESS,
                payload
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should save a create credential error by marking it as completed, failed, and storing it', () => {
            const response = {
                error: 'Internal Server Error',
                message: 'An internal error occured! Try again later.',
                statusCode: 500
            };
            const expectedState = {
                action: CREATE_CREDENTIAL_ERROR,
                running: false,
                success: false,
                response
            };
            const actualState = credentialCrudAction(null, {
                type: CREATE_CREDENTIAL_ERROR,
                payload: new Error(JSON.stringify(response)),
                error: true
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should save an edit credential request by marking it as running action', () => {
            const expectedState = {
                action: EDIT_CREDENTIAL_REQUEST,
                running: true
            };
            const actualState = credentialCrudAction(null, {
                type: EDIT_CREDENTIAL_REQUEST
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should save an edit credential success by marking it as completed, successful, and storing it', () => {
            const payload = {
                success: true
            };
            const expectedState = {
                action: EDIT_CREDENTIAL_SUCCESS,
                running: false,
                success: true,
                response: payload
            };
            const actualState = credentialCrudAction(null, {
                type: EDIT_CREDENTIAL_SUCCESS,
                payload
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should save an edit credential error by marking it as completed, failed, and storing it', () => {
            const response = {
                error: 'Internal Server Error',
                message: 'An internal error occured! Try again later.',
                statusCode: 500
            };
            const expectedState = {
                action: EDIT_CREDENTIAL_ERROR,
                running: false,
                success: false,
                response
            };
            const actualState = credentialCrudAction(null, {
                type: EDIT_CREDENTIAL_ERROR,
                payload: new Error(JSON.stringify(response)),
                error: true
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should save a delete credential request by marking it as running action', () => {
            const expectedState = {
                action: DELETE_CREDENTIAL_REQUEST,
                running: true
            };
            const actualState = credentialCrudAction(null, {
                type: DELETE_CREDENTIAL_REQUEST
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should save a delete credential success by marking it as completed, successful, and storing it', () => {
            const payload = {
                uuid: 'abc123'
            };
            const expectedState = {
                action: DELETE_CREDENTIAL_SUCCESS,
                running: false,
                success: true,
                response: payload
            };
            const actualState = credentialCrudAction(null, {
                type: DELETE_CREDENTIAL_SUCCESS,
                payload
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should save a delete credential error by marking it as completed, failed, and storing it', () => {
            const response = {
                error: 'Internal Server Error',
                message: 'An internal error occured! Try again later.',
                statusCode: 500
            };
            const expectedState = {
                action: DELETE_CREDENTIAL_ERROR,
                running: false,
                success: false,
                response
            };
            const actualState = credentialCrudAction(null, {
                type: DELETE_CREDENTIAL_ERROR,
                payload: new Error(JSON.stringify(response)),
                error: true
            });

            expect(expectedState).toEqual(actualState);
        });
    });

    describe('Notification State', () => {
        const { SET_NOTIFICATION_STATE } = actions.types;

        it('should set the notification state with message and status', () => {
            const payload = {
                status: 'low',
                message: 'Credential was successfully created.'
            };
            const expectedState = { payload };
            const actualState = notificationState(null, {
                type: SET_NOTIFICATION_STATE,
                payload
            });

            expect(expectedState).toEqual(actualState);
        });
    });
});
