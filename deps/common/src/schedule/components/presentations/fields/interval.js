import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { Select } from '@hivekit/select';

const Interval = ({ rate, input }) => {
    const maxIntervalSize = 20;
    // Create an array of [1 - 20] to generate options for <Select />
    const oneThroughTwenty = [...Array(maxIntervalSize + 1).keys()].splice(1).map((num) => {
        return {
            value: num,
            label: num === 1 ? rate : `${num} ${rate}s`
        };
    });
    const props = {
        ...input,
        options: oneThroughTwenty,
        simpleValue: true
    };

    return (
        <FormItem label='REPEAT EVERY'>
            <Select { ...props } />
        </FormItem>
    );
};

Interval.propTypes = {
    input: PropTypes.object.isRequired,
    rate: PropTypes.oneOf(['Day', 'Week', 'Month', 'Year'])
};

export {
    Interval
};
