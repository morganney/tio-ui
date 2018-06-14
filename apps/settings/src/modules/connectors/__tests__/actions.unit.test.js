import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { STANDARD_API_ACTION } from 'tio-alloy';

import * as actions from '../actions';

describe('Settings - Connectors Module Actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    describe('Fetch Connectors', () => {
        const { fetchConnectors } = actions;
        const {
            GET_CONNECTORS_REQUEST,
            GET_CONNECTORS_SUCCESS,
            GET_CONNECTORS_ERROR
        } = actions.types;

        it('should create an action to get connectors', () => {
            const store = mockStore({});
            const url = '/settings/connectors';

            const expectedAction = {
                type: STANDARD_API_ACTION,
                meta: {
                    types: [
                        GET_CONNECTORS_REQUEST,
                        GET_CONNECTORS_SUCCESS,
                        GET_CONNECTORS_ERROR
                    ],
                    processResponseBeforeDispatch: expect.any(Function),
                    request: url
                }
            };

            store.dispatch(fetchConnectors());

            expect(store.getActions()[0]).toEqual(expectedAction);
        });
    });
});
