import { SET_SEARCH_TERMS } from './types';

const setSearchTerms = (payload) => {
    return {
        type: SET_SEARCH_TERMS,
        payload
    };
};
export {
    setSearchTerms
};
