import moment from 'moment';

export const date = (value, format = 'MM/DD/YYYY') => {
    if (moment.isMoment(value)) {
        return value.isValid();
    }

    if (value instanceof Date) {
        return moment(value).isValid();
    }

    if (typeof value === 'string') {
        return moment(value, format, true).isValid();
    }

    return false;
};
