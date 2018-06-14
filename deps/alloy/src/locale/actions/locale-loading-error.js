import { LOCALE_LOADING_ERROR } from './types';

export const localeLoadingError = (error) => {
    return {
        type: LOCALE_LOADING_ERROR,
        payload: error,
        error: true
    };
};
