import * as actions from '../actions';
import {
    configurationsList,
    search,
    credential
} from '../reducers';

describe('Settings - Credential Form Module Reducers', () => {
    describe('Select Credential Type Form', () => {
        const {
            GET_CONFIGURATIONS_LIST_SUCCESS,
            GET_CONFIGURATIONS_LIST_ERROR,
            SET_SEARCH
        } = actions.types;

        it('should set the credential select search upon enter', () => {
            const expectedState = 'waldo';
            const actualState = search(null, {
                type: SET_SEARCH,
                payload: 'waldo'
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should set the credentials configuration upon successful api request', () => {
            const expectedState = [];
            const actualState = configurationsList(null, {
                type: GET_CONFIGURATIONS_LIST_SUCCESS,
                payload: {
                    credentials: []
                }
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should leave the credentials configuration alone upon failed api request', () => {
            const expectedState = [];
            const actualState = configurationsList([], {
                type: GET_CONFIGURATIONS_LIST_ERROR,
                payload: {
                    credentials: [
                        {
                            key: 'value'
                        }
                    ]
                }
            });

            expect(expectedState).toEqual(actualState);
        });
    });

    describe('Other Reducers', () => {
        const {
            GET_CREDENTIAL_SUCCESS,
            GET_CREDENTIAL_ERROR
        } = actions.types;

        it('should be able to load a credential\'s settings upon successful api request', () => {
            const credentialSettings = {
                name: 'Bowser Castle Login',
                description: 'This the login into King Bowser\'s flying castle. No mushroom eatin\' chumps allowed',
                settings: {
                    username: 'KingKoopa',
                    password: 'Buhahaha!!',
                    domain: 'MushroomKingdom.com'
                }
            };

            const actualState = credential({}, {
                type: GET_CREDENTIAL_SUCCESS,
                payload: credentialSettings
            });

            expect(actualState).toEqual(credentialSettings);
        });

        it('should leave the credential allow upon a failed api request', () => {
            const actualState = credential({}, {
                type: GET_CREDENTIAL_ERROR,
                payload: {
                    error: true
                }
            });

            expect(actualState).toEqual({});
        });
    });
});
