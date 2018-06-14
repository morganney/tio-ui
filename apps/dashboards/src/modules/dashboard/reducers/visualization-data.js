import { VISUALIZATION_DATA_SUCCESS, VISUALIZATION_DATA_RESET, VISUALIZATION_DATA_ERROR } from '../actions/types';

const visualizationData = (state = { data: [] }, action) => {
    switch (action.type) {
        case VISUALIZATION_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case VISUALIZATION_DATA_RESET:
        case VISUALIZATION_DATA_ERROR:
            return {
                ...state,
                data: []
            };
        default:
            return state;
    }
};

export { visualizationData };
