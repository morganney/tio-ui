import moment from 'moment';

export const dateComesBefore = (before, unit = 'day', format = 'MM/DD/YYYY') => {
    return (value) => {
        if (moment.isMoment(value)) {
            return value.isBefore(before, unit);
        }

        if (value instanceof Date) {
            return moment(value).isBefore(before, unit);
        }

        if (typeof value === 'string') {
            return moment(value, format).isBefore(before, unit);
        }

        return false;
    };
};
