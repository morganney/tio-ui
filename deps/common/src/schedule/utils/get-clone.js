import moment from 'moment';

import { START_DATE_FORMAT } from 'schedule/constants';

export const getClone = (values) => {
    const clone = {
        ...values,
        startDate: moment(values.startDate, START_DATE_FORMAT),
        repeatOn: [...values.repeatOn]
    };

    return clone;
};
