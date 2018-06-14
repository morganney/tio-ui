import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { Select } from '@hivekit/select';

const Timezone = ({ timezones, input }) => {
    const props = {
        ...input,
        options: timezones,
        value: input.value,
        simpleValue: true,
        searchable: true,
        onBlur () {
            input.onBlur(input.value);
        }
    };

    return (
        <FormItem label='TIME ZONE'>
            <Select { ...props } />
        </FormItem>
    );
};

Timezone.propTypes = {
    timezones: PropTypes.array.isRequired,
    input: PropTypes.object.isRequired
};

export {
    Timezone
};
