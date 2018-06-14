import { updateIntl } from 'react-intl-redux';
import { addLocaleData } from 'react-intl';

import { localeLoading, localeLoadingError } from '../index';

export const localeChange = (locale, onLocaleChange) => {
    return (dispatch) => {
        (async () => {
            // @see https://webpack.js.org/api/module-methods/#import-
            const imports = [
                import(
                    /* webpackChunkName: "i18n/locale-data/[request]" */
                    `i18n/locale-data/${locale}`
                ),
                import(
                    /* webpackChunkName: "i18n/translations/[request]" */
                    `i18n/translations/${locale}.json`
                )
            ];
            let localeData = null;
            let messages = null;

            dispatch(localeLoading(locale));

            try {
                [localeData, messages] = await Promise.all(imports);
            } catch (error) {
                return dispatch(localeLoadingError(error));
            }

            addLocaleData(localeData);
            dispatch(updateIntl({ locale, messages }));

            if (typeof onLocaleChange === 'function') {
                onLocaleChange(locale);
            }
        })();
    };
};
