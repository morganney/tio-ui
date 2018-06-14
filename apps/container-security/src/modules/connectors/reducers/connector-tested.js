import {
    TEST_CONNECTOR_SUCCESS,
    TEST_CONNECTOR_ERROR
} from '../actions/types';

const initialState = false;

const connectorTested = (state = initialState, action) => {
    switch (action.type) {
        case TEST_CONNECTOR_SUCCESS: {
            // 200 OK triggers TEST_CONNECTOR_SUCCESS, even though the call itself will actually fail internally
            // When the call fails internally, the API signals this through an `error` prop in the response
            let testWasSuccessful = true;

            if (action.payload.error) {
                testWasSuccessful = false;
            }

            return testWasSuccessful;
        }
        case TEST_CONNECTOR_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    connectorTested
};
