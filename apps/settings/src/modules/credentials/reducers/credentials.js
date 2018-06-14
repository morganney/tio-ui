import {
    GET_CREDENTIALS_SUCCESS,
    GET_CREDENTIALS_ERROR
} from '../actions/types';
import {
    DEFAULT_OFFSET,
    DEFAULT_LIMIT
} from '../constants';

const initialState = {
    credentials: [],
    pagination: {
        total: 0,
        offset: DEFAULT_OFFSET,
        limit: DEFAULT_LIMIT,
        sort: []
    }
};

const credentials = (state = initialState, action) => {
    switch (action.type) {
        case GET_CREDENTIALS_SUCCESS: {
            return {
                ...state,
                ...action.payload
            };
        }
        case GET_CREDENTIALS_ERROR:
            return state;
        default:
            return state;
    }
};

export {
    credentials
};
