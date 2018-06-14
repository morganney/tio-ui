import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { STANDARD_API_ACTION } from 'tio-alloy';

import * as actions from '../actions';
import {
    BRANCH_NAME,
    STEM_NAME,
    DEFAULT_LIMIT,
    DEFAULT_OFFSET
} from '../constants';

describe('Settings - Credentials Module Actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    function getInitialState (newState = {}) {
        const defaultState = {
            credentialsFilters: {
                wildcardFields: []
            },
            credentialsFetchOptions: {
                offset: DEFAULT_OFFSET,
                limit: DEFAULT_LIMIT,
                sorts: [{
                    name: 'created_date',
                    order: 'desc'
                }],
                filters: [],
                search: '',
                search_type: 'and'
            }
        };

        return {
            [BRANCH_NAME]: {
                [STEM_NAME]: {
                    ...defaultState,
                    ...newState
                }
            }
        };
    }

    describe('Fetch Credentials', () => {
        const { fetchCredentials } = actions;
        const {
            GET_CREDENTIALS_REQUEST,
            GET_CREDENTIALS_SUCCESS,
            GET_CREDENTIALS_ERROR
        } = actions.types;

        it('should create an action to get credentials without sorting if no field is present', () => {
            const options = {
                offset: DEFAULT_OFFSET,
                limit: DEFAULT_LIMIT,
                sorts: [],
                filters: [],
                search: '',
                search_type: 'and'
            };

            const store = mockStore(getInitialState({ credentialsFetchOptions: options }));

            const url = `/credentials?offset=${DEFAULT_OFFSET}&limit=${DEFAULT_LIMIT}`;
            const expectedAction = {
                type: STANDARD_API_ACTION,
                meta: {
                    types: [
                        GET_CREDENTIALS_REQUEST,
                        GET_CREDENTIALS_SUCCESS,
                        GET_CREDENTIALS_ERROR
                    ],
                    request: url
                }
            };

            store.dispatch(fetchCredentials({
                offset: DEFAULT_OFFSET,
                limit: DEFAULT_LIMIT,
                sorts: []
            }));

            expect(store.getActions()[0]).toEqual(expectedAction);
        });

        it('should create an action to get credentials with sorting if field is present', () => {
            const options = {
                offset: DEFAULT_OFFSET,
                limit: DEFAULT_LIMIT,
                sorts: [{
                    name: 'name',
                    order: 'asc'
                }],
                filters: [],
                search: '',
                search_type: 'and'
            };

            const store = mockStore(getInitialState({ credentialsFetchOptions: options }));

            const url = `/credentials?offset=${DEFAULT_OFFSET}&limit=${DEFAULT_LIMIT}&sort=name:asc`;
            const expectedAction = {
                type: STANDARD_API_ACTION,
                meta: {
                    types: [
                        GET_CREDENTIALS_REQUEST,
                        GET_CREDENTIALS_SUCCESS,
                        GET_CREDENTIALS_ERROR
                    ],
                    request: url
                }
            };

            store.dispatch(fetchCredentials(options));

            expect(store.getActions()[0]).toEqual(expectedAction);
        });

        it('should create an action to get credentials with filters if an array of filters are passed in', () => {
            const options = {
                offset: DEFAULT_OFFSET,
                limit: DEFAULT_LIMIT,
                sorts: [{
                    name: 'created_date',
                    order: 'desc'
                }],
                filters: [{
                    name: 'name',
                    typeCheck: 'eq',
                    values: 'thomyorke'
                }],
                search: '',
                search_type: 'and'
            };

            const store = mockStore(getInitialState({ credentialsFetchOptions: options }));

            const url = `/credentials?offset=${DEFAULT_OFFSET}&limit=${DEFAULT_LIMIT}` +
                `&sort=created_date:desc&f=name:eq:thomyorke&ft=and`;
            const expectedAction = {
                type: STANDARD_API_ACTION,
                meta: {
                    types: [
                        GET_CREDENTIALS_REQUEST,
                        GET_CREDENTIALS_SUCCESS,
                        GET_CREDENTIALS_ERROR
                    ],
                    request: url
                }
            };

            store.dispatch(fetchCredentials(options));

            expect(store.getActions()[0]).toEqual(expectedAction);
        });
    });

    describe('Set Credentials Fetch Options', () => {
        const { setCredentialsFetchOptions } = actions;
        const { SET_CREDENTIALS_FETCH_OPTIONS } = actions.types;

        it('should create an action when setting fetch credentials options', () => {
            const store = mockStore(getInitialState());
            const options = {
                filters: [{
                    name: 'Jonny Greenwood',
                    typeCheck: 'eq',
                    values: 'Phantom Thread'
                }],
                search: 'waldo',
                search_type: 'and'
            };

            const expectedAction = {
                type: SET_CREDENTIALS_FETCH_OPTIONS,
                payload: options
            };

            store.dispatch(setCredentialsFetchOptions(options));

            expect(store.getActions()[0]).toEqual(expectedAction);
        });
    });

    describe('Delete Credential', () => {
        const { deleteCredential } = actions;
        const {
            DELETE_CREDENTIAL_REQUEST,
            DELETE_CREDENTIAL_SUCCESS,
            DELETE_CREDENTIAL_ERROR
        } = actions.types;

        it('should create an action calling deleteCredential', () => {
            const uuid = 'abc-123';
            const url = `/credentials/${uuid}`;
            const expectedAction = {
                type: STANDARD_API_ACTION,
                meta: {
                    types: [
                        DELETE_CREDENTIAL_REQUEST,
                        DELETE_CREDENTIAL_SUCCESS,
                        DELETE_CREDENTIAL_ERROR
                    ],
                    request: {
                        url,
                        method: 'DELETE'
                    }
                }
            };

            const actualAction = deleteCredential(uuid);

            expect(actualAction).toEqual(expectedAction);
        });
    });

    describe('Set Notification State', () => {
        const { setNotificationState } = actions;
        const { SET_NOTIFICATION_STATE } = actions.types;

        it('should set the notification state', () => {
            const payload = {
                status: 'low',
                message: 'Credential was successfully created.'
            };
            const expectedAction = {
                type: SET_NOTIFICATION_STATE,
                payload
            };
            const actualAction = setNotificationState(payload);

            expect(expectedAction).toEqual(actualAction);
        });
    });

    describe('Delete Credential And Do Post Render', () => {
        const { deleteCredentialAndDoPostRender } = actions;
        const {
            DELETE_CREDENTIAL_REQUEST,
            DELETE_CREDENTIAL_SUCCESS,
            DELETE_CREDENTIAL_ERROR,
            GET_CREDENTIALS_REQUEST,
            GET_CREDENTIALS_SUCCESS,
            GET_CREDENTIALS_ERROR,
            SET_NOTIFICATION_STATE
        } = actions.types;

        it('should delete a credential and upon success notify the user', async (done) => {
            const store = mockStore(getInitialState({
                credentialCrudAction: {
                    success: true,
                    running: false
                }
            }));

            const uuid = 'abcd';

            const expectedActions = [
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            DELETE_CREDENTIAL_REQUEST,
                            DELETE_CREDENTIAL_SUCCESS,
                            DELETE_CREDENTIAL_ERROR
                        ],
                        request: {
                            url: `/credentials/${uuid}`,
                            method: 'DELETE'
                        }
                    }
                },
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            GET_CREDENTIALS_REQUEST,
                            GET_CREDENTIALS_SUCCESS,
                            GET_CREDENTIALS_ERROR
                        ],
                        request: '/credentials?offset=0&limit=50&sort=created_date:desc'
                    }
                },
                {
                    type: SET_NOTIFICATION_STATE,
                    payload: {
                        status: 'low',
                        message: 'Credential successfully deleted.'
                    }
                }
            ];

            await store.dispatch(deleteCredentialAndDoPostRender(uuid));

            const actualActions = store.getActions();

            expect(actualActions).toMatchObject(expectedActions);

            done();
        });

        it('should delete a credential and upon error notify the user', async (done) => {
            const store = mockStore(getInitialState({
                credentialCrudAction: {
                    success: false,
                    running: false,
                    response: {
                        message: 'Credential failed to be deleted.'
                    }
                }
            }));

            const uuid = 'abcd';

            const expectedActions = [
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            DELETE_CREDENTIAL_REQUEST,
                            DELETE_CREDENTIAL_SUCCESS,
                            DELETE_CREDENTIAL_ERROR
                        ],
                        request: {
                            url: `/credentials/${uuid}`,
                            method: 'DELETE'
                        }
                    }
                },
                {
                    type: SET_NOTIFICATION_STATE,
                    payload: {
                        status: 'critical',
                        message: 'Credential failed to be deleted.'
                    }
                }
            ];

            await store.dispatch(deleteCredentialAndDoPostRender(uuid));

            const actualActions = store.getActions();

            expect(actualActions).toMatchObject(expectedActions);

            done();
        });
    });
});
