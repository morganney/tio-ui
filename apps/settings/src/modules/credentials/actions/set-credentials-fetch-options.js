import { SET_CREDENTIALS_FETCH_OPTIONS } from './types';

const setCredentialsFetchOptions = (options) => {
    return {
        type: SET_CREDENTIALS_FETCH_OPTIONS,
        payload: options
    };
};

export {
    setCredentialsFetchOptions
};
