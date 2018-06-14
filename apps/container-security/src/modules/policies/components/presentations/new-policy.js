import React from 'react';
import PropTypes from 'prop-types';
import { Plane, PlanePreview } from '@hivekit/plane';

import { constants as commonConstants } from 'tio-common';
import { BASE_PATH } from 'tio-container-security/modules/common/constants';
import {
    NewPolicyFormHeaderComponent,
    NewPolicyFormBodyComponent,
    NewPolicyFormFooterComponent
} from 'tio-container-security/modules/policies/components';

const NewPolicyView = ({
    // Redux data/reducers
    newPolicyPlaneDisplay,
    initialValues,

    // React-router props
    history,

    // Redux dispatches
    createPolicy,
    toggleNewPolicyPlane,
    reset: resetReduxForm,

    // i18n messages
    saveText,

    // Presentation props
    preventCloseWhenClicked
}) => {
    // Business logic functions
    const closeNewPolicyPlane = () => {
        toggleNewPolicyPlane('closed');

        // Additionally, reset the 'new' form to its initial state whenever the form is closed.
        resetReduxForm();

        // TODO: setTimeout is intended as temporary until a more formal routing transition solution is in place.
        setTimeout(() => {
            history.push(`${BASE_PATH}/dashboard/policies`);
        }, commonConstants.planeTransitionInMs);
    };
    const onPlaneChange = (res) => {
        if (res !== newPolicyPlaneDisplay && res === 'closed') {
            closeNewPolicyPlane();
        }
    };

    // Render helpers
    const renderPreviewContent = () => {
        const formBodyProps = {
            initialValues,
            enableReinitialize: true
        };
        const previewProps = {
            header: <NewPolicyFormHeaderComponent />,
            content: <NewPolicyFormBodyComponent {...formBodyProps} />
        };

        return (
            <PlanePreview {...previewProps} />
        );
    };
    const renderPreviewFooter = () => {
        const footerProps = {
            onFormCancel: closeNewPolicyPlane,
            onFormSubmit: createPolicy,
            saveText
        };

        return (
            <NewPolicyFormFooterComponent {...footerProps} />
        );
    };

    // JSX props
    const planeProps = {
        // Behavior/events
        onChange: onPlaneChange,
        preventCloseWhenClicked,

        // Appearance
        display: newPolicyPlaneDisplay,
        preview: renderPreviewContent,
        previewFooter: renderPreviewFooter
    };

    // JSX return
    return (
        <Plane {...planeProps} />
    );
};

NewPolicyView.propTypes = {
    // Redux data/reducers
    newPolicyPlaneDisplay: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,

    // React-router props
    history: PropTypes.object.isRequired,

    // Redux dispatches
    createPolicy: PropTypes.func.isRequired,
    toggleNewPolicyPlane: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,

    // i18n messages
    saveText: PropTypes.string.isRequired,

    // Presentation props
    preventCloseWhenClicked: PropTypes.object
};

export {
    NewPolicyView
};
