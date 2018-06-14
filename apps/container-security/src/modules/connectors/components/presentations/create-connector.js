import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AwsElbIcon } from '@hivekit/icon';
import {
    Plane,
    PlanePreview,
    PlanePreviewHeader,
    PlanePreviewHeaderView
} from '@hivekit/plane';

import { constants as commonConstants } from 'tio-common';
import { CONNECTOR_REDUX_FORM } from 'tio-container-security/modules/connectors/constants';
import { BASE_PATH } from 'tio-container-security/modules/common/constants';

import {
    ConnectorFormBodyComponent,
    ConnectorFormFooterComponent
} from '../';

class CreateConnectorView extends Component {
    static propTypes = {
        // Redux data/reducers
        createConnectorPlaneDisplay: PropTypes.string.isRequired,

        // Redux dispatches
        toggleCreateConnectorPlane: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,

        // React-router props
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,

        // i18n messages
        descriptionText: PropTypes.string.isRequired,
        titleText: PropTypes.string.isRequired
    };

    constructor () {
        super();
        this.onPlaneChange = this.onPlaneChange.bind(this);
        this.closeCreateConnectorPlane = this.closeCreateConnectorPlane.bind(this);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderPreviewContent = this.renderPreviewContent.bind(this);
        this.renderPreviewFooter = this.renderPreviewFooter.bind(this);
    }

    // Business logic functions
    onPlaneChange (res) {
        const { createConnectorPlaneDisplay } = this.props;

        if (res !== createConnectorPlaneDisplay && res === 'closed') {
            this.closeCreateConnectorPlane();
        }
    }

    closeCreateConnectorPlane () {
        const { reset, history, toggleCreateConnectorPlane } = this.props;

        // TODO: setTimeout is intended as temporary until a more formal routing transition solution is in place.
        reset(CONNECTOR_REDUX_FORM);
        toggleCreateConnectorPlane('closed');
        setTimeout(() => {
            history.push(`${BASE_PATH}/dashboard`);
        }, commonConstants.planeTransitionInMs);
    }

    // Render helper functions
    renderHeader () {
        const { descriptionText, titleText } = this.props;

        const icon = (
            <AwsElbIcon size={3} />
        );

        const content = (
            <PlanePreviewHeaderView
                title={titleText}
                description={descriptionText}
                titleisEditable={false}
                titleIsRequired={true} />
        );

        return (
            <PlanePreviewHeader
                iconComponent={icon}
                contentComponent={content} />
        );
    }

    renderPreviewContent () {
        const previewContent = (
            <ConnectorFormBodyComponent />
        );

        return (
            <PlanePreview
                header={this.renderHeader()}
                content={previewContent} />
        );
    }

    renderPreviewFooter () {
        return (
            <ConnectorFormFooterComponent
                onFormCancel={this.closeCreateConnectorPlane} />
        );
    }

    // React's render
    render () {
        const { createConnectorPlaneDisplay } = this.props;

        return (
            <Plane
                // Behavior/events
                onChange={this.onPlaneChange}

                // Appearance
                display={createConnectorPlaneDisplay}
                preview={this.renderPreviewContent}
                previewFooter={this.renderPreviewFooter} />
        );
    }
}

export {
    CreateConnectorView
};
