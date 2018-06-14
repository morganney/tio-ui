import moment from 'moment';

const DATE_FORMAT_COMPACT = 'MM/DD/YY';
const DATE_FORMAT_MONTH_DAY = 'MMMM DD';
const DATE_FORMAT_MONTH_DAY_YEAR = 'MMMM DD, YYYY';
const DATE_FORMAT_YEAR_MONTH_DAY = 'YYYY/MM/DD';
const DATE_FORMAT_WITHTIME = 'MM/DD/YY [at] h:mm A';

// Exports
const dateFormatStrings = {
    DATE_FORMAT_COMPACT,
    DATE_FORMAT_MONTH_DAY,
    DATE_FORMAT_MONTH_DAY_YEAR,
    DATE_FORMAT_YEAR_MONTH_DAY,
    DATE_FORMAT_WITHTIME
};
const dateFormat = (date, format = DATE_FORMAT_COMPACT) => {
    return moment(date).format(format);
};
const dateDiffInDays = (startDate = moment(), endDate = moment()) => {
    return moment(endDate).diff(moment(startDate), 'days');
};

export {
    dateFormat,
    dateDiffInDays,
    dateFormatStrings
};
