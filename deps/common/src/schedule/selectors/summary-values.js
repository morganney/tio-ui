import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';

import { STEM_NAME } from 'schedule/constants';
import { formatValuesForSummary } from 'schedule/utils';

const selector = formValueSelector(STEM_NAME);
const summaryFormValues = (state) => {
    const fields = [
        'enabled',
        'frequency',
        'interval',
        'repeatBy',
        'repeatOn',
        'startDate',
        'startTime'
    ];

    return selector(state, ...fields);
};

export const summaryValues = createSelector(summaryFormValues, (values) => {
    return formatValuesForSummary(values);
});
