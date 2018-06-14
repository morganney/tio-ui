/**
 * This is currently the summary format used for scheduling exports of dashboards.
 * It will be updated as needed when the other apps make use of the scheduler.
 */

import moment from 'moment';

import {
    ONCE,
    DAILY,
    WEEKLY,
    MONTHLY,
    BY_MONTH_DAY,
    SUMMARY_DATE_FORMAT,
    SUMMARY_TIME_FORMAT,
    SUMMARY_ANNUAL_DATE_FORMAT
} from 'schedule/constants';

import { parse } from './parse';
import { formatValuesForSummary } from './format-values-for-summary';

const once = ({ date, time }) => {
    return `Once on ${date} at ${time}`;
};
const daily = ({ date, time, interval }) => {
    const term = interval === 1 ? 'Daily' : `Every ${interval} days`;

    return `${term} at ${time}, starting on ${date}`;
};
const weekly = ({ date, time, interval, repeatOn }) => {
    const daysMap = {
        SU: 'Sunday',
        MO: 'Monday',
        TU: 'Tuesday',
        WE: 'Wednesday',
        TH: 'Thursday',
        FR: 'Friday',
        SA: 'Saturday'
    };

    const days = repeatOn.map((day) => {
        return daysMap[day];
    });
    const term = interval === 1 ? 'every week' : `every ${interval} weeks`;

    return `Repeats ${term} on ${days.join(', ')} at ${time}, starting on ${date}`;
};
const monthly = ({ date, time, interval, repeatBy }) => {
    const repeat = repeatBy === BY_MONTH_DAY ? 'day' : 'week';
    const term = interval === 1 ? 'Monthly' : `Every ${interval} months`;

    return `${term} (repeating by the ${repeat}) at ${time}, starting ${date}`;
};
const yearly = ({ startMoment, time, interval }) => {
    const term = interval === 1 ? 'Annually' : `Every ${interval} years`;

    return `${term} on ${startMoment.format(SUMMARY_ANNUAL_DATE_FORMAT)} at ${time}`;
};
const summary = (config, shouldParse = false) => {
    const schedule = shouldParse ? formatValuesForSummary(parse(config)) : config;

    if (!schedule || !schedule.enabled) {
        return 'No exports scheduled for this dashboard';
    }

    const { frequency, startDate, startTime, interval, repeatOn, repeatBy } = schedule;
    const startMoment = moment(`${startDate}T${startTime}`, 'YYYYMMDDTHHmmss');
    const date = startMoment.format(SUMMARY_DATE_FORMAT);
    const time = startMoment.format(SUMMARY_TIME_FORMAT);

    if (frequency === ONCE) {
        return once({ date, time });
    }

    if (frequency === DAILY) {
        return daily({ date, time, interval });
    }

    if (frequency === WEEKLY) {
        return weekly({ date, time, interval, repeatOn });
    }

    if (frequency === MONTHLY) {
        return monthly({ date, time, interval, repeatBy });
    }

    return yearly({ startMoment, time, interval });
};

export {
    summary
};
