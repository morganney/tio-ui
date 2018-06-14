import {
    RUN_CONNECTOR_SUCCESS,
    RUN_CONNECTOR_ERROR
} from '../actions/types';

const initialState = false;

const connectorRan = (state = initialState, action) => {
    switch (action.type) {
        case RUN_CONNECTOR_SUCCESS: {
            // 200 OK triggers RUN_CONNECTOR_SUCCESS, even though the call itself will actually fail internally
            // When the call fails internally, the API signals this through an `error` prop in the response
            let runWasSuccessful = true;

            if (action.payload.error) {
                runWasSuccessful = false;
            }

            return runWasSuccessful;
        }
        case RUN_CONNECTOR_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    connectorRan
};
