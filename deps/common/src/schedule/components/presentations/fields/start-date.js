import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormItem } from '@hivekit/form';
import { DatePicker } from '@hivekit/date-picker';

import { START_DATE_FORMAT } from 'schedule/constants';
import { date as dateIsValid } from 'validation/validators';
import { dateComesBefore } from 'validation/factories';

const now = moment();
const { DATETIME_LOCAL, DATE } = moment.HTML5_FMT;
const isBeforeMinDate = dateComesBefore(now);

const validator = (value, { rawDateText, startTime }) => {
    const msg = [];

    if (!dateIsValid(value) || !dateIsValid(rawDateText) || isBeforeMinDate(rawDateText)) {
        msg.push('Invalid start date');
    }

    if (value) {
        const startDate = value.format(DATE);
        const isBeforeNowToMinute = dateComesBefore(moment(), 'minute', DATETIME_LOCAL);

        if (isBeforeNowToMinute(`${startDate}T${startTime}`)) {
            msg.push('Invalid start time');
        }
    }

    if (msg.length) {
        return msg.join('<br />');
    }
};
const StartDate = ({ input, meta, change, touch }) => {
    const { touched, error } = meta;
    const props = {
        ...input,
        minDate: now,
        selected: input.value || meta.initial,
        customInputWidth: '100%',
        dateFormat: START_DATE_FORMAT,
        placeholderText: START_DATE_FORMAT,
        onFocus (evt) {
            // Mark the field as 'visited' in redux-form
            input.onFocus(evt);
        },
        // This one triggers if the user opens the calendar, but never selects a date
        onBlur () {
            // Mark the field as 'touched' in redux-form
            input.onBlur(this.selected);
        },
        // This one triggers if the user opens the calendar and then selects a date
        onSelect (date) {
            if (date) {
                touch('startTime');
                change('rawDateText', date.format(START_DATE_FORMAT));
                // Mark the field as 'touched' in redux-form
                input.onBlur(date);
            }
        },
        onChangeRaw (evt) {
            touch('startTime');
            change('rawDateText', evt.target.value);
        }
    };
    const formItemProps = {
        label: 'STARTS',
        error: touched && error ? error : ''
    };

    return (
        <FormItem { ...formItemProps }>
            <DatePicker { ...props } />
        </FormItem>
    );
};

StartDate.propTypes = {
    change: PropTypes.func.isRequired,
    touch: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
};

export {
    StartDate,
    validator
};
