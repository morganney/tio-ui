import {
    GET_CONNECTORS_SUCCESS
} from '../actions/types';
import {
    DEFAULT_OFFSET,
    DEFAULT_LIMIT
} from '../constants';

const initialState = {
    items: [],
    pagination: {
        total: 0,
        offset: DEFAULT_OFFSET,
        limit: DEFAULT_LIMIT,
        sort: []
    }
};

const connectors = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONNECTORS_SUCCESS: {
            const { items, pagination } = action.payload;

            return {
                ...state,
                items,
                pagination
            };
        }
        default:
            return state;
    }
};

export {
    connectors
};
