import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { Select } from '@hivekit/select';

const Frequency = ({ frequencies, input }) => {
    const props = {
        ...input,
        options: frequencies,
        simpleValue: true
    };

    return (
        <FormItem label='FREQUENCY'>
            <Select { ...props } />
        </FormItem>
    );
};

Frequency.propTypes = {
    frequencies: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired
};

export {
    Frequency
};
