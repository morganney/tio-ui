import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { Box } from '@hivekit/layout';
import { Button, ButtonGroup } from '@hivekit/button';
import { colors } from '@hivekit/core';

import { minLength } from 'validation/factories';

const minLength1 = minLength(1);

const validator = (value) => {
    if (!minLength1(value)) {
        return 'Invalid day(s) of week';
    }
};
const RepeatOn = ({ weekdays, input, meta }) => {
    const { onChange, onFocus, onBlur } = input;
    const { touched, error } = meta;
    const value = [...input.value];
    const onClick = (evt) => {
        const { target } = evt;
        const idx = value.indexOf(target.value);
        let updatedValue = null;

        if (idx >= 0) {
            value.splice(idx, 1);
        } else {
            value.push(target.value);
        }

        // Clone the above mutations into a new copy
        updatedValue = [...value];

        // Mark the field as 'visited' in redux-form
        onFocus(evt);

        onChange(updatedValue);

        // Mark the field as 'touched' in redux-form
        onBlur(updatedValue);
    };
    const formItemProps = {
        label: 'REPEAT ON',
        error: touched && error ? error : ''
    };

    return (
        <Box width={1} mb={2}>
            <FormItem { ...formItemProps }>
                <ButtonGroup buttonWidth={`${100 / weekdays.length}%`}>
                    {weekdays.map((day, idx) => {
                        const dayInValue = value.indexOf(day.value) >= 0;
                        const props = {
                            kind: 'custom',
                            value: day.value,
                            backgroundColor: dayInValue ? colors.grayLight : 'none',
                            onClick
                        };

                        return (
                            <Button { ...props } key={idx}>
                                {day.label}
                            </Button>
                        );
                    })}
                </ButtonGroup>
            </FormItem>
        </Box>
    );
};

RepeatOn.propTypes = {
    weekdays: PropTypes.array.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
};

export {
    RepeatOn,
    validator
};
