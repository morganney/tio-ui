import {
    VISUALIZATION_DATA_REQUEST,
    VISUALIZATION_DATA_SUCCESS,
    VISUALIZATION_DATA_ERROR
} from '../actions/types';

const fetchingVisualizationData = (state = false, action) => {
    switch (action.type) {
        case VISUALIZATION_DATA_REQUEST:
            return true;
        case VISUALIZATION_DATA_SUCCESS:
        case VISUALIZATION_DATA_ERROR:
            return false;
        default:
            return state;
    }
};

export { fetchingVisualizationData };
