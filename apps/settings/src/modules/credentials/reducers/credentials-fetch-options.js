import { SET_CREDENTIALS_FETCH_OPTIONS } from '../actions/types';
import { DEFAULT_OFFSET, DEFAULT_LIMIT } from '../constants';

const initialState = {
    offset: DEFAULT_OFFSET,
    limit: DEFAULT_LIMIT,
    sorts: [
        {
            name: 'created_date',
            order: 'desc'
        }
    ],
    filters: [],
    search: '',
    search_type: 'and'
};

const credentialsFetchOptions = (state = initialState, action) => {
    switch (action.type) {
        case SET_CREDENTIALS_FETCH_OPTIONS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export {
    credentialsFetchOptions
};
