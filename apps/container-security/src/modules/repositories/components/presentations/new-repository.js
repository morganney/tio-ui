import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plane, PlanePreview, PlanePreviewHeader } from '@hivekit/plane';
import { AwsRdsIcon } from '@hivekit/icon';

import { RepositoryFormBodyComponent } from '../';

class NewRepositoryView extends Component {
    static propTypes = {
        // Redux data/reducers
        newRepositoryPlaneDisplay: PropTypes.string.isRequired,

        // Redux dispatches
        toggleNewRepositoryPlane: PropTypes.func.isRequired
    }

    constructor () {
        super();

        this.onPlaneChange = this.onPlaneChange.bind(this);
        this.closeNewRepositoryPlane = this.closeNewRepositoryPlane.bind(this);

        this.renderPreviewContent = this.renderPreviewContent.bind(this);
    }

    // Business logic functions
    onPlaneChange (res) {
        const { toggleNewRepositoryPlane, newRepositoryPlaneDisplay } = this.props;

        if (res !== newRepositoryPlaneDisplay && res === 'closed') {
            // Only dispatch the action, if the plane is changing to a NEW state
            toggleNewRepositoryPlane(res);
        }
    }

    closeNewRepositoryPlane () {
        const { toggleNewRepositoryPlane } = this.props;

        toggleNewRepositoryPlane('closed');
    }

    // Render helper functions
    renderPreviewContent () {
        const icon = (
            <AwsRdsIcon size={3} />
        );
        const content = (
            <RepositoryFormBodyComponent />
        );

        // props
        const headerProps = {
            iconComponent: icon,
            contentComponent: content
        };

        const previewHeader = (
            <PlanePreviewHeader {...headerProps} />
        );

        return (
            <PlanePreview
                header={previewHeader}/>
        );
    }

    // React's render
    render () {
        const { newRepositoryPlaneDisplay } = this.props;

        return (
            <Plane
                // Behavior/events
                onChange={this.onPlaneChange}

                // Appearance
                display={newRepositoryPlaneDisplay}
                preview={this.renderPreviewContent} />
        );
    }
}

export {
    NewRepositoryView
};
