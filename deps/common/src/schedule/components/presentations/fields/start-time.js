import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormItem } from '@hivekit/form';
import { Select } from '@hivekit/select';

import { dateComesBefore, mmddyyyy } from 'validation/factories';

const { DATETIME_LOCAL } = moment.HTML5_FMT;
const isMonthDayYear = mmddyyyy('/');

const validator = (value, { startDate: startDateMoment, rawDateText }) => {
    if (!isMonthDayYear(rawDateText)) {
        return 'Invalid start date';
    }

    if (startDateMoment) {
        // Convert mm/dd/yyyy to yyyy-mm-dd
        const startDate = rawDateText.replace(/(..).(..).(....)/, '$3-$1-$2');
        const isBeforeNowToMinute = dateComesBefore(moment(), 'minute', DATETIME_LOCAL);

        if (isBeforeNowToMinute(`${startDate}T${value}`)) {
            return 'Invalid start time';
        }
    }
};
const StartTime = ({ times, input, meta, touch }) => {
    const { touched, error } = meta;
    const options = times.map((time) => {
        return {
            value: time,
            label: time
        };
    });
    const props = {
        ...input,
        options,
        simpleValue: true,
        searchable: true,
        onChange (time) {
            touch('startDate');
            input.onChange(time);
        },
        /**
         * @see https://github.com/JedWatson/react-select/issues/1129#issuecomment-386153868
         * Encountered the above issue only in combination with searchable: true.
         * Without this react-select would return "" onBlur thereby clearing the
         * previously searched for value.
         */
        onBlur () {
            input.onBlur(input.value);
        }
    };
    const formItemProps = {
        label: 'START TIME',
        opacity: 0,
        error: touched && error ? error : ''
    };

    return (
        <FormItem { ...formItemProps }>
            <Select { ...props } />
        </FormItem>
    );
};

StartTime.propTypes = {
    touch: PropTypes.func.isRequired,
    times: PropTypes.array.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
};

export {
    StartTime,
    validator
};
