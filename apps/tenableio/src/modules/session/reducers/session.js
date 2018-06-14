import {
    SESSION_REQUEST,
    SESSION_SUCCESS,
    SESSION_ERROR,
    SESSION_DESTROY,
    HEARTBEAT_REQUEST,
    HEARTBEAT_SUCCESS,
    HEARTBEAT_ERROR,
    SET_DEFAULT_DASHBOARD,
    SET_TEMPORARY_FEATUREFLAG,
    CLEAR_TEMPORARY_FEATUREFLAG
} from '../actions/types';

const session = (state = {}, action) => {
    switch (action.type) {
        case SESSION_REQUEST:
            return state;
        case SESSION_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case HEARTBEAT_REQUEST:
            return {
                ...state,
                heartbeat: {
                    isFetching: true
                }
            };
        case HEARTBEAT_SUCCESS:
            return {
                ...state,
                heartbeat: {
                    isFetching: false
                }
            };
        case SET_TEMPORARY_FEATUREFLAG: {
            const activeFeatures = {
                ...state.activeFeatures,
                [action.payload]: true
            };

            return {
                ...state,
                activeFeatures
            };
        }
        case CLEAR_TEMPORARY_FEATUREFLAG: {
            const activeFeatures = { ...state.activeFeatures };

            delete activeFeatures[action.payload];

            return {
                ...state,
                activeFeatures
            };
        }
        case SESSION_ERROR:
            return state;
        case HEARTBEAT_ERROR:
            return state;
        case SESSION_DESTROY:
            return {};
        case SET_DEFAULT_DASHBOARD:
            return {
                ...state,
                userPreferences: {
                    defaultDashboard: action.payload
                }
            };
        default:
            return state;
    }
};

export {
    session
};
