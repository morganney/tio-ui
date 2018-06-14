import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { PlanePreviewHeaderForm } from '@hivekit/plane';
import { TextInput } from '@hivekit/text-input';

const NameInputView = ({
    input
}) => {
    const titleRenderer = (
        <FormItem required={true}>
            <TextInput {...input} size={4} />
        </FormItem>
    );

    const headerFormProps = {
        titleComponent: titleRenderer
    };

    return (
        <PlanePreviewHeaderForm {...headerFormProps} />
    );
};

NameInputView.propTypes = {
    input: PropTypes.object.isRequired
};

export { NameInputView };
