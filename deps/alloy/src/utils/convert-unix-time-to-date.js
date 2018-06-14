import moment from 'moment';

const convertUnixTimeToDate = (unconvertedDate, dateFormat = 'YYYY-MM-DD') => {
    const MS_IN_SECOND = 1000;
    const unconvertedDateInMs = unconvertedDate * MS_IN_SECOND;

    return moment(new Date(unconvertedDateInMs)).format(dateFormat);
};

export {
    convertUnixTimeToDate
};
