import { LOCALE_LOADING } from './types';

export const localeLoading = (locale) => {
    return {
        type: LOCALE_LOADING,
        payload: locale
    };
};
