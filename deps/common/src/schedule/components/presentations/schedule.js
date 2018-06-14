import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@hivekit/layout';
import { Field } from 'redux-form';

import {
    times,
    weekdays,
    repeatBy,
    frequencies
} from 'schedule/initialization-data';
import {
    ONCE,
    DAILY,
    WEEKLY,
    MONTHLY,
    YEARLY
} from 'schedule/constants';

import {
    Frequency,
    StartDate,
    StartTime,
    Timezone,
    Interval,
    RepeatBy,
    RepeatOn,
    startDateValidator,
    startTimeValidator,
    repeatOnValidator
} from './fields';

const renderFrequency = (frequency) => {
    const marginRight = frequency === ONCE ? 0 : '6px';
    const props = {
        name: 'frequency',
        component: Frequency,
        frequencies
    };

    return (
        <Box width={1} mr={marginRight}>
            <Field { ...props } />
        </Box>
    );
};
const renderInterval = (frequency) => {
    const rates = {
        [DAILY]: 'Day',
        [WEEKLY]: 'Week',
        [MONTHLY]: 'Month',
        [YEARLY]: 'Year'
    };
    const props = {
        name: 'interval',
        component: Interval,
        rate: rates[frequency]
    };

    if (frequency === ONCE) {
        return null;
    }

    return (
        <Box width={1}>
            <Field { ...props } />
        </Box>
    );
};
const renderStartDate = (change, touch) => {
    const props = {
        name: 'startDate',
        component: StartDate,
        validate: startDateValidator,
        change,
        touch
    };

    return <Field { ...props } />;
};
const renderStartTime = (touch) => {
    const props = {
        name: 'startTime',
        component: StartTime,
        validate: startTimeValidator,
        touch,
        times
    };

    return <Field { ...props } />;
};
const renderTimezone = (timezones) => {
    const props = {
        name: 'timezone',
        component: Timezone,
        timezones
    };

    if (!timezones.length) {
        return null;
    }

    return <Field { ...props } />;
};
const renderRepeatOn = (frequency) => {
    const props = {
        name: 'repeatOn',
        component: RepeatOn,
        validate: repeatOnValidator,
        weekdays
    };

    if (frequency !== WEEKLY) {
        return null;
    }

    return <Field { ...props } />;
};
const renderRepeatBy = (frequency) => {
    const props = {
        name: 'repeatBy',
        component: RepeatBy,
        repeatBy
    };

    if (frequency !== MONTHLY) {
        return null;
    }

    return <Field { ...props } />;
};

const ScheduleView = ({
    timezones,
    frequency,
    change,
    touch
}) => {
    return (
        <Fragment>
            <Flex alignItems='flex-end'>
                <Box width={1}>
                    <Flex flexWrap='nowrap' alignItems='flex-end'>
                        { renderFrequency(frequency) }
                        { renderInterval(frequency) }
                    </Flex>
                </Box>
                { renderRepeatOn(frequency) }
                { renderRepeatBy(frequency) }
                <Box width={1}>
                    <Flex flexWrap='nowrap' alignItems='flex-end'>
                        <Box width={1} mr='6px'>
                            { renderStartDate(change, touch) }
                        </Box>
                        <Box width='40%'>
                            { renderStartTime(touch) }
                        </Box>
                    </Flex>
                </Box>
                <Box width={1}>
                    { renderTimezone(timezones) }
                </Box>
            </Flex>
        </Fragment>
    );
};

ScheduleView.propTypes = {
    config: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    touch: PropTypes.func.isRequired,
    timezones: PropTypes.array.isRequired,
    frequency: PropTypes.string.isRequired
};

export {
    ScheduleView
};
