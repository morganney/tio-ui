import moment from 'moment';

import { START_TIME_FORMAT, START_DATE_FORMAT } from 'schedule/constants';

const getDatetimeInitialValues = () => {
    const startMoment = moment();
    const halfHour = 30;

    if (startMoment.minutes() > halfHour) {
        startMoment.add(halfHour, 'minutes').startOf('hour');
    } else {
        startMoment.minutes(halfHour).startOf('minute');
    }

    return {
        startDate: startMoment,
        rawDateText: startMoment.format(START_DATE_FORMAT),
        startTime: startMoment.format(START_TIME_FORMAT)
    };
};

export {
    getDatetimeInitialValues
};
