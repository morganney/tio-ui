import { createSelector } from 'reselect';
import { getFormValues } from 'redux-form';

import { STEM_NAME } from 'schedule/constants';

import { format } from './format';
import { getClone } from './get-clone';

export const createPayloadSelector = (formatter) => {
    return createSelector(getFormValues(STEM_NAME), (values) => {
        const clone = getClone(values);

        if (typeof formatter === 'function') {
            return formatter(clone);
        }

        return format(clone);
    });
};
