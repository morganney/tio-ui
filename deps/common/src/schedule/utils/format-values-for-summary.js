import { weekdays } from 'schedule/initialization-data';

import { getClone } from './get-clone';

const scale = weekdays.map((day) => {
    return day.value;
});
const calendarWeek = (day1, day2) => {
    if (scale.indexOf(day1) > scale.indexOf(day2)) {
        return 1;
    }

    if (scale.indexOf(day1) < scale.indexOf(day2)) {
        return -1;
    }

    return 0;
};

export const formatValuesForSummary = (values) => {
    if (Object.keys(values).length) {
        const clone = getClone(values);

        clone.startDate = clone.startDate.format('YYYYMMDD');
        clone.startTime = `${clone.startTime.replace(':', '')}00`;
        clone.repeatOn.sort(calendarWeek);

        return clone;
    }
};
