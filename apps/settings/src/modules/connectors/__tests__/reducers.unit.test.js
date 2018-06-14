import {
    connectorsFetching,
    connectors
} from '../reducers';
import * as actions from '../actions';

describe('Settings - Connectors Module Reducers', () => {
    describe('Connectors Fetching', () => {
        const {
            GET_CONNECTORS_REQUEST,
            GET_CONNECTORS_SUCCESS,
            GET_CONNECTORS_ERROR
        } = actions.types;

        it('should set connectorsFetching flag to true during get connectors request', () => {
            const expectedState = true;
            const actualState = connectorsFetching(false, {
                type: GET_CONNECTORS_REQUEST
            });

            expect(actualState).toEqual(expectedState);
        });

        it('should set connectorsFetching flag to false on get connectors success', () => {
            const expectedState = false;
            const actualState = connectorsFetching(true, {
                type: GET_CONNECTORS_SUCCESS
            });

            expect(actualState).toEqual(expectedState);
        });

        it('should set connectorsFetching flag to false on get connectors failure', () => {
            const expectedState = false;
            const actualState = connectorsFetching(true, {
                type: GET_CONNECTORS_ERROR
            });

            expect(actualState).toEqual(expectedState);
        });
    });

    describe('Connectors Table', () => {
        const { GET_CONNECTORS_SUCCESS } = actions.types;

        it('should set connectors and pagination properly if fetchConnectors is successful', () => {
            const expectedState = {
                items: [{
                    name: 'hi',
                    type: 'how',
                    status: 'u',
                    date_created: '05/31/18',
                    last_connection: '05/31/18'
                }],
                pagination: {
                    yo: 'bro'
                }
            };

            const actualState = connectors(null, {
                type: GET_CONNECTORS_SUCCESS,
                payload: expectedState
            });

            expect(actualState).toEqual(expectedState);
        });
    });
});
