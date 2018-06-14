import { STANDARD_API_ACTION } from 'tio-alloy';

import { createConnector,
    toggleCreateConnectorPlane,
    setNotificationState,
    types
} from '../actions';

// Unpack policy fetch action types
const {
    TOGGLE_CREATE_CONNECTOR_PLANE,
    CREATE_CONNECTOR_REQUEST,
    CREATE_CONNECTOR_SUCCESS,
    CREATE_CONNECTOR_ERROR,
    SET_NOTIFICATION_STATE
} = types;

describe('Connector Module Actions', () => {
    it('Should create an action to create new connector', () => {
        const defaultUrl = '/container-security/api/v2/imports';
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    CREATE_CONNECTOR_REQUEST,
                    CREATE_CONNECTOR_SUCCESS,
                    CREATE_CONNECTOR_ERROR
                ],
                request: defaultUrl
            }
        };
        const receivedAction = createConnector();

        expect(receivedAction.type).toEqual(expectedAction.type);
        expect(receivedAction.meta.types).toEqual(expectedAction.meta.types);
        expect(receivedAction.meta.request.url).toEqual(expectedAction.meta.request);
    });

    it('Should create an action to toggle connectors plane', (displayState = 'closed') => {
        const expectedAction = {
            type: TOGGLE_CREATE_CONNECTOR_PLANE,
            payload: displayState
        };
        const receivedAction = toggleCreateConnectorPlane('partial');

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to set notifications state', (notificationOptions = {}) => {
        const expectedAction = {
            type: SET_NOTIFICATION_STATE,
            payload: notificationOptions
        };
        const receivedAction = setNotificationState();

        expect(receivedAction.type).toEqual(expectedAction.type);
    });
});
