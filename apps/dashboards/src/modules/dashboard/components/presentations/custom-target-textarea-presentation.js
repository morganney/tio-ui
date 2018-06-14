import React from 'react';
import { Field } from 'redux-form';
import { FormItem } from '@hivekit/form';
import { TextArea } from '@hivekit/text-area';

const CustomTargetTextarea = () => {
    const renderTextarea = (field) => {
        const { input, meta: { error, touched } } = field;

        return (
            <FormItem error={touched && error ? error : ''}>
                <TextArea
                    {...input}
                    placeholder='192.168.1.1-192.168.1.5, 192.168.2.0/24'
                />
            </FormItem>
        );
    };

    return (
        <Field
            name='customTarget'
            component={renderTextarea}
        />
    );
};

export {
    CustomTargetTextarea
};
