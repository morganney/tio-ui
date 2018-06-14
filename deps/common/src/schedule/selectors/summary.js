import { createSelector } from 'reselect';

import { summary as summaryText } from 'schedule/utils';

import { summaryValues } from './summary-values';

export const summary = createSelector(summaryValues, (values) => {
    return summaryText(values);
});
