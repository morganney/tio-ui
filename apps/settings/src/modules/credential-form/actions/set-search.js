import { SET_SEARCH } from './types';

const setSearch = (search) => {
    return {
        type: SET_SEARCH,
        payload: search
    };
};

export {
    setSearch
};
