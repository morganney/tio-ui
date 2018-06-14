import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CALL_HISTORY_METHOD } from 'react-router-redux';
import { actionTypes } from 'redux-form';

import { STANDARD_API_ACTION } from 'tio-alloy';

import * as actions from './../actions';
import { BRANCH_NAME, STEM_NAME } from './../constants';

import * as credentialActions from '../../credentials/actions';
import {
    BRANCH_NAME as CREDENTIALS_BRANCH_NAME,
    STEM_NAME as CREDENTIALS_STEM_NAME
} from '../../credentials/constants';

describe('Settings - Credential Form Module Actions', () => {
    const CREDENTIALS_BASE = '/credentials';

    describe('Select Credential Type Form', () => {
        const {
            fetchConfigurationsList,
            setSearch
        } = actions;
        const {
            GET_CONFIGURATIONS_LIST_REQUEST,
            GET_CONFIGURATIONS_LIST_SUCCESS,
            GET_CONFIGURATIONS_LIST_ERROR,
            SET_SEARCH
        } = actions.types;

        it('should create an action to set the credential select search', () => {
            const queryOptions = {
                search: 'waldo',
                filters: []
            };

            const expectedAction = {
                type: SET_SEARCH,
                payload: queryOptions.search
            };

            const actualAction = setSearch(queryOptions.search);

            expect(expectedAction).toEqual(actualAction);
        });

        it('should create an action to fetch the credential configurations list', () => {
            const expectedAction = {
                type: STANDARD_API_ACTION,
                meta: {
                    types: [
                        GET_CONFIGURATIONS_LIST_REQUEST,
                        GET_CONFIGURATIONS_LIST_SUCCESS,
                        GET_CONFIGURATIONS_LIST_ERROR
                    ],
                    request: `${CREDENTIALS_BASE}/types`
                }
            };
            const actualAction = fetchConfigurationsList();

            expect(expectedAction).toEqual(actualAction);
        });
    });

    describe('Form Submission', () => {
        const mockStore = configureMockStore([thunk]);
        const {
            createCredential,
            getCredential,
            editCredential,
            createCredentialAndDoPostRender,
            loadCredential,
            editCredentialAndDoPostRender
        } = actions;
        const {
            GET_CONFIGURATIONS_LIST_REQUEST,
            GET_CONFIGURATIONS_LIST_SUCCESS,
            GET_CONFIGURATIONS_LIST_ERROR,
            CREATE_CREDENTIAL_REQUEST,
            CREATE_CREDENTIAL_SUCCESS,
            CREATE_CREDENTIAL_ERROR,
            GET_CREDENTIAL_REQUEST,
            GET_CREDENTIAL_SUCCESS,
            GET_CREDENTIAL_ERROR,
            EDIT_CREDENTIAL_REQUEST,
            EDIT_CREDENTIAL_SUCCESS,
            EDIT_CREDENTIAL_ERROR
        } = actions.types;
        const {
            GET_CREDENTIALS_REQUEST,
            GET_CREDENTIALS_SUCCESS,
            GET_CREDENTIALS_ERROR,
            SET_NOTIFICATION_STATE
        } = credentialActions.types;

        it('should create an action to create a credential', () => {
            const payload = {
                type: 'windows',
                username: 'JohnCena9001',
                password: 'Tenable@123'
            };
            const expectedAction = {
                type: STANDARD_API_ACTION,
                meta: {
                    types: [
                        CREATE_CREDENTIAL_REQUEST,
                        CREATE_CREDENTIAL_SUCCESS,
                        CREATE_CREDENTIAL_ERROR
                    ],
                    request: {
                        url: CREDENTIALS_BASE,
                        method: 'POST',
                        body: JSON.stringify(payload)
                    }
                }
            };
            const actualAction = createCredential(payload);

            expect(expectedAction).toEqual(actualAction);
        });

        it('should create an action to get a credential', () => {
            const uuid = 'abc-1234';
            const expectedAction = {
                type: STANDARD_API_ACTION,
                meta: {
                    types: [
                        GET_CREDENTIAL_REQUEST,
                        GET_CREDENTIAL_SUCCESS,
                        GET_CREDENTIAL_ERROR
                    ],
                    request: `${CREDENTIALS_BASE}/${uuid}`
                }
            };
            const actualAction = getCredential(uuid);

            expect(expectedAction).toEqual(actualAction);
        });

        it('should create an action to edit a credential', () => {
            const uuid = 'efg-789';
            const payload = {
                type: 'windows',
                username: 'Dwayne@TheRock@Johnson',
                password: 'Tenable@123'
            };
            const expectedAction = {
                type: STANDARD_API_ACTION,
                meta: {
                    types: [
                        EDIT_CREDENTIAL_REQUEST,
                        EDIT_CREDENTIAL_SUCCESS,
                        EDIT_CREDENTIAL_ERROR
                    ],
                    request: {
                        url: `${CREDENTIALS_BASE}/${uuid}`,
                        method: 'PUT',
                        body: JSON.stringify(payload)
                    }
                }
            };
            const actualAction = editCredential(uuid, payload);

            expect(expectedAction).toEqual(actualAction);
        });

        it('should create a credential and, upon success, close the plane and notify the user', async (done) => {
            const payload = {
                type: 'windows',
                username: 'JohnCena9001',
                password: 'Tenable@123'
            };
            const store = mockStore({
                [CREDENTIALS_BRANCH_NAME]: {
                    [CREDENTIALS_STEM_NAME]: {
                        credentialCrudAction: {
                            action: CREATE_CREDENTIAL_SUCCESS,
                            running: false,
                            success: true,
                            response: {}
                        },
                        credentialsFilters: {
                            wildcardFields: []
                        },
                        credentialsFetchOptions: {
                            offset: 0,
                            limit: 50,
                            sorts: [{
                                name: 'created_by',
                                order: 'asc'
                            }],
                            filters: [],
                            search: ''
                        }
                    }
                }
            });

            const expectedActions = [
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            CREATE_CREDENTIAL_REQUEST,
                            CREATE_CREDENTIAL_SUCCESS,
                            CREATE_CREDENTIAL_ERROR
                        ],
                        request: {
                            url: CREDENTIALS_BASE,
                            method: 'POST',
                            body: JSON.stringify(payload)
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
                        request: `${CREDENTIALS_BASE}?offset=0&limit=50&sort=created_by:asc`
                    }
                },
                {
                    type: SET_NOTIFICATION_STATE,
                    payload: {
                        status: 'low',
                        message: 'Credential successfully created.'
                    }
                },
                {
                    type: CALL_HISTORY_METHOD,
                    payload: {
                        args: [
                            '/settings/credentials'
                        ],
                        method: 'push'
                    }
                }
            ];

            await store.dispatch(createCredentialAndDoPostRender(payload));

            const actualActions = store.getActions();

            expect(expectedActions).toMatchObject(actualActions);

            done();
        });

        it('should create a credential and, upon failure, notify the user', async (done) => {
            const payload = {
                type: 'windows',
                username: 'JohnCena9001',
                password: 'Tenable@123'
            };
            const store = mockStore({
                [CREDENTIALS_BRANCH_NAME]: {
                    [CREDENTIALS_STEM_NAME]: {
                        credentialCrudAction: {
                            action: CREATE_CREDENTIAL_ERROR,
                            running: false,
                            success: false,
                            response: {
                                message: 'Error.'
                            }
                        }
                    }
                }
            });
            const expectedActions = [
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            CREATE_CREDENTIAL_REQUEST,
                            CREATE_CREDENTIAL_SUCCESS,
                            CREATE_CREDENTIAL_ERROR
                        ],
                        request: {
                            url: CREDENTIALS_BASE,
                            method: 'POST',
                            body: JSON.stringify(payload)
                        }
                    }
                },
                {
                    type: SET_NOTIFICATION_STATE,
                    payload: {
                        status: 'critical',
                        message: 'Error.'
                    }
                }
            ];

            await store.dispatch(createCredentialAndDoPostRender(payload));

            const actualActions = store.getActions();

            expect(expectedActions).toMatchObject(actualActions);

            done();
        });

        it('should load a credential and, upon success, set the category, type, and init the form', async (done) => {
            const uuid = 'abc-1234';
            const credential = {
                category: { id: 'host', name: 'Host' },
                type: { id: 'windows', name: 'Windows' },
                name: 'JOHN CENAAAAAA Login',
                description: 'All access pass to JOHN CENNAAAs locker',
                settings: {
                    auth_method: 'Password',
                    username: 'JohnCena9001',
                    password: 'Tenable@123'
                }
            };
            const store = mockStore({
                [BRANCH_NAME]: {
                    [STEM_NAME]: {
                        credential,
                        configurationsList: []
                    }
                }
            });
            const { INITIALIZE } = actionTypes;

            const expectedActions = [
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            GET_CONFIGURATIONS_LIST_REQUEST,
                            GET_CONFIGURATIONS_LIST_SUCCESS,
                            GET_CONFIGURATIONS_LIST_ERROR
                        ],
                        request: `${CREDENTIALS_BASE}/types`
                    }
                },
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            GET_CREDENTIAL_REQUEST,
                            GET_CREDENTIAL_SUCCESS,
                            GET_CREDENTIAL_ERROR
                        ],
                        request: `${CREDENTIALS_BASE}/${uuid}`
                    }
                },
                {
                    type: INITIALIZE,
                    meta: {
                        form: 'settings.credentialForm.settingsForm',
                        // eslint-disable-next-line no-undefined
                        keepDirty: undefined
                    },
                    payload: {
                        auth_method: 'Password',
                        description: 'All access pass to JOHN CENNAAAs locker',
                        name: 'JOHN CENAAAAAA Login',
                        password: 'Tenable@123',
                        username: 'JohnCena9001'
                    }
                }
            ];

            await store.dispatch(loadCredential(uuid));

            const actualActions = store.getActions();

            expect(expectedActions).toMatchObject(actualActions);

            done();
        });

        it('should load a credential and, upon failure, notify the user', async (done) => {
            const uuid = 'abc-1234';
            const store = mockStore({
                [BRANCH_NAME]: {
                    [STEM_NAME]: {
                        credential: {},
                        configurationsList: []
                    }
                }
            });

            const expectedActions = [
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            GET_CONFIGURATIONS_LIST_REQUEST,
                            GET_CONFIGURATIONS_LIST_SUCCESS,
                            GET_CONFIGURATIONS_LIST_ERROR
                        ],
                        request: `${CREDENTIALS_BASE}/types`
                    }
                },
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            GET_CREDENTIAL_REQUEST,
                            GET_CREDENTIAL_SUCCESS,
                            GET_CREDENTIAL_ERROR
                        ],
                        request: `${CREDENTIALS_BASE}/${uuid}`
                    }
                },
                {
                    type: SET_NOTIFICATION_STATE,
                    payload: {
                        status: 'critical',
                        message: 'Credential could not be loaded.'
                    }
                },
                {
                    type: CALL_HISTORY_METHOD,
                    payload: {
                        args: ['/settings/credentials'],
                        method: 'push'
                    }
                }
            ];

            await store.dispatch(loadCredential(uuid));

            const actualActions = store.getActions();

            expect(expectedActions).toMatchObject(actualActions);

            done();
        });

        it('should skip loading the config list when loading a credential, if it\'s already loaded', async (done) => {
            const uuid = 'abc-1234';
            const store = mockStore({
                [BRANCH_NAME]: {
                    [STEM_NAME]: {
                        credential: {},
                        configurationsList: [
                            {
                                name: 'My Credential of Awesomeness'
                            }
                        ]
                    }
                }
            });

            const expectedFirstAction = {
                type: STANDARD_API_ACTION,
                meta: {
                    types: [
                        GET_CREDENTIAL_REQUEST,
                        GET_CREDENTIAL_SUCCESS,
                        GET_CREDENTIAL_ERROR
                    ],
                    request: `${CREDENTIALS_BASE}/${uuid}`
                }
            };

            await store.dispatch(loadCredential(uuid));

            const actualActions = store.getActions();

            expect(expectedFirstAction).toMatchObject(actualActions[0]);

            done();
        });

        it('should edit a credential and, upon success, close the plane and notify the user', async (done) => {
            const uuid = 'efg-789';
            const payload = {
                type: 'windows',
                username: 'Dwayne@TheRock@Johnson',
                password: 'Tenable@123'
            };
            const store = mockStore({
                [CREDENTIALS_BRANCH_NAME]: {
                    [CREDENTIALS_STEM_NAME]: {
                        credentialCrudAction: {
                            action: EDIT_CREDENTIAL_SUCCESS,
                            running: false,
                            success: true,
                            response: {}
                        },
                        credentialsFilters: {
                            wildcardFields: []
                        },
                        credentialsFetchOptions: {
                            offset: 0,
                            limit: 50,
                            sorts: [{
                                name: 'created_by',
                                order: 'asc'
                            }],
                            filters: [],
                            search: ''
                        }
                    }
                }
            });

            const expectedActions = [
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            EDIT_CREDENTIAL_REQUEST,
                            EDIT_CREDENTIAL_SUCCESS,
                            EDIT_CREDENTIAL_ERROR
                        ],
                        request: {
                            url: `${CREDENTIALS_BASE}/${uuid}`,
                            method: 'PUT',
                            body: JSON.stringify(payload)
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
                        request: `${CREDENTIALS_BASE}?offset=0&limit=50&sort=created_by:asc`
                    }
                },
                {
                    type: SET_NOTIFICATION_STATE,
                    payload: {
                        status: 'low',
                        message: 'Credential successfully editted.'
                    }
                },
                {
                    type: CALL_HISTORY_METHOD,
                    payload: {
                        args: [
                            '/settings/credentials'
                        ],
                        method: 'push'
                    }
                }
            ];

            await store.dispatch(editCredentialAndDoPostRender(uuid, payload));

            const actualActions = store.getActions();

            expect(expectedActions).toMatchObject(actualActions);

            done();
        });

        it('should edit a credential and, upon failure, notify the user', async (done) => {
            const uuid = 'efg-789';
            const payload = {
                type: 'windows',
                username: 'Dwayne@TheRock@Johnson',
                password: 'Tenable@123'
            };
            const store = mockStore({
                [CREDENTIALS_BRANCH_NAME]: {
                    [CREDENTIALS_STEM_NAME]: {
                        credentialCrudAction: {
                            action: EDIT_CREDENTIAL_ERROR,
                            running: false,
                            success: false,
                            response: {
                                message: 'Credential failed to be editted.'
                            }
                        }
                    }
                }
            });
            const expectedActions = [
                {
                    type: STANDARD_API_ACTION,
                    meta: {
                        types: [
                            EDIT_CREDENTIAL_REQUEST,
                            EDIT_CREDENTIAL_SUCCESS,
                            EDIT_CREDENTIAL_ERROR
                        ],
                        request: {
                            url: `${CREDENTIALS_BASE}/${uuid}`,
                            method: 'PUT',
                            body: JSON.stringify(payload)
                        }
                    }
                },
                {
                    type: SET_NOTIFICATION_STATE,
                    payload: {
                        status: 'critical',
                        message: 'Credential failed to be editted.'
                    }
                }
            ];

            await store.dispatch(editCredentialAndDoPostRender(uuid, payload));

            const actualActions = store.getActions();

            expect(expectedActions).toMatchObject(actualActions);

            done();
        });
    });
});
