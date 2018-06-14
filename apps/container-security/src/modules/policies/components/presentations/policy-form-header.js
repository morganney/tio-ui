import React from 'react';
import { Field } from 'redux-form';
import { PoliciesIcon } from '@hivekit/icon';
import { PlanePreviewHeader } from '@hivekit/plane';

import { NameInputComponent } from 'tio-container-security/modules/policies/components';

const PolicyFormHeaderView = () => {
    // JSX markup
    const icon = (
        <PoliciesIcon size={3} />
    );
    const content = (
        <Field name={'name'} component={NameInputComponent} />
    );

    // props
    const headerProps = {
        iconComponent: icon,
        contentComponent: content
    };

    return (
        <PlanePreviewHeader {...headerProps} />
    );
};

export {
    PolicyFormHeaderView
};
