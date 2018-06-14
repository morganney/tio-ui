import * as reducer from '../reducers';
import * as type from '../actions/types';

describe('Connectors reducers', () => {
    describe('Connector created data reducer', () => {
        const initialState = {
            success: false,
            data: {}
        };

        it('Should return the initial state', () => {
            expect(reducer.connectorCreated(initialState, {})).toEqual(initialState);
        });

        it('Should handle CREATE_CONNECTOR_SUCCESS', () => {
            const action = {
                type: type.CREATE_CONNECTOR_SUCCESS,
                payload: {}
            };
            const expectedState = {
                success: true,
                data: {}
            };

            expect(reducer.connectorCreated(initialState, action)).toEqual(expectedState);
        });

        it('Should handle CREATE_CONNECTOR_ERROR', () => {
            const action = {
                type: type.CREATE_CONNECTOR_ERROR,
                payload: {}
            };
            const expectedState = {
                success: false,
                data: {}
            };

            expect(reducer.connectorCreated(initialState, action)).toEqual(expectedState);
        });

        it('Should return unchanged state for unknown action', () => {
            expect(reducer.connectorCreated(initialState, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
        });
    });

    describe('Connectors Plane Display reducer', () => {
        const initialState = 'closed';

        it('Should return initial state', () => {
            expect(reducer.createConnectorPlaneDisplay(initialState, {})).toEqual('closed');
        });

        it('Should handle TOGGLE_CREATE_CONNECTOR_PLANE', () => {
            const action = {
                type: type.TOGGLE_CREATE_CONNECTOR_PLANE,
                payload: 'partial'
            };
            const expectedState = 'partial';

            expect(reducer.createConnectorPlaneDisplay(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Notification State reducer', () => {
        const initialState = {};

        it('Should return initial state', () => {
            expect(reducer.notificationState(initialState, {})).toEqual(initialState);
        });

        it('Should handle SET_NOTIFICATION_STATE', () => {
            const action = {
                type: type.SET_NOTIFICATION_STATE,
                payload: {}
            };
            const expectedState = {};

            expect(reducer.notificationState(initialState, action)).toEqual(expectedState);
        });
    });
});
