/**
 * This is currently for parsing the schedule format used by GET /reporting/reports/dashboard/:uuid
 * It will be updated to account for other formats when those apps require use of the scheduler.
 */

import moment from 'moment';

import {
    START_TIME_FORMAT,
    START_DATE_FORMAT
} from 'schedule/constants';

const parse = (schedule) => {
    const response = {
        enabled: schedule.enabled
    };
    const [timezone, start] = schedule.start.split(':');

    response.timezone = timezone.split('=')[1];
    response.startDate = moment(start);
    response.startTime = response.startDate.format(START_TIME_FORMAT);
    response.rawDateText = response.startDate.format(START_DATE_FORMAT);

    schedule.repeatRule.split(';').forEach((part) => {
        const [key, value] = part.split('=');

        switch (key) {
            case 'FREQ':
                response.frequency = value;
                break;
            case 'INTERVAL':
                response.interval = parseInt(value, 10);
                break;
            case 'BYDAY':
                if (/^\d/.test(value)) {
                    response.repeatBy = 'BYWEEKNO';
                } else {
                    response.repeatOn = value.split(',');
                }
                break;
            case 'BYMONTHDAY':
            case 'BYWEEKNO':
                response.repeatBy = key;
                break;
        }
    });

    return response;
};

export {
    parse
};
