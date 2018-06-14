import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { Box } from '@hivekit/layout';
import { Select } from '@hivekit/select';

const RepeatBy = ({ repeatBy, input }) => {
    const props = {
        ...input,
        options: repeatBy,
        simpleValue: true
    };

    return (
        <Box width={1}>
            <FormItem label='REPEAT BY'>
                <Select { ...props } />
            </FormItem>
        </Box>
    );
};

RepeatBy.propTypes = {
    repeatBy: PropTypes.array.isRequired,
    input: PropTypes.object.isRequired
};

export {
    RepeatBy
};
