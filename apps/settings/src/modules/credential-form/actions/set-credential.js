import { SET_CREDENTIAL } from './types';

const setCredential = (credential) => {
    return {
        type: SET_CREDENTIAL,
        payload: credential
    };
};

export {
    setCredential
};
