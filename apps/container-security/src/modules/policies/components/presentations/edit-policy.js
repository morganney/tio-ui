import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plane, PlanePreview, PlanePreviewActionBar } from '@hivekit/plane';

import {
    PolicyActionsComponent,
    EditPolicyFormHeaderComponent,
    EditPolicyFormBodyComponent,
    EditPolicyFormFooterComponent
} from '../';

class EditPolicyView extends Component {
    static propTypes = {
        // Redux props
        drilldownPolicy: PropTypes.object,
        editPolicyPlaneDisplay: PropTypes.string.isRequired,
        initialValues: PropTypes.object.isRequired,

        // Redux dispatches
        toggleEditPolicyPlane: PropTypes.func.isRequired,
        editPolicy: PropTypes.func.isRequired,

        // i18n messages
        saveText: PropTypes.string.isRequired,

        // Presentation props
        preventCloseWhenClicked: PropTypes.object
    }

    constructor () {
        super();

        this.onPlaneChange = this.onPlaneChange.bind(this);
        this.closeEditPolicyPlane = this.closeEditPolicyPlane.bind(this);
        this.savePolicy = this.savePolicy.bind(this);

        this.renderEditActions = this.renderEditActions.bind(this);
        this.renderPreviewContent = this.renderPreviewContent.bind(this);
        this.renderPreviewFooter = this.renderPreviewFooter.bind(this);
    }

    // Business logic functions
    onPlaneChange (res) {
        const { toggleEditPolicyPlane, editPolicyPlaneDisplay } = this.props;

        // TODO: talk to Noah, seems like a bug where changes in a parent plane can trigger this to return states we shouldn't listen for here
        if (res !== editPolicyPlaneDisplay && res === 'closed') {
            // Only dispatch the action, if the plane is changing to a NEW state
            toggleEditPolicyPlane(res);
        }
    }

    closeEditPolicyPlane () {
        const { toggleEditPolicyPlane } = this.props;

        toggleEditPolicyPlane('closed');
    }

    savePolicy (payload) {
        // Redux props
        const { drilldownPolicy, editPolicy } = this.props;

        // Data point derivations
        const policyId = drilldownPolicy.id;

        editPolicy(policyId, payload);
    }

    // Render helper functions
    renderEditActions () {
        // Data points coming through redux store
        const { drilldownPolicy } = this.props;
        const nodeWrapper = {
            data: drilldownPolicy || {}
        };

        // JSX markup
        const actions = (
            <PolicyActionsComponent
                node={nodeWrapper} />
        );

        return (
            <PlanePreviewActionBar
                actions={actions} />
        );
    }

    renderPreviewContent () {
        const { initialValues } = this.props;
        const formBodyProps = {
            initialValues,
            enableReinitialize: true
        };
        const previewHeader = (
            <EditPolicyFormHeaderComponent />
        );
        const previewContent = (
            <React.Fragment>
                {this.renderEditActions()}
                <EditPolicyFormBodyComponent {...formBodyProps} />
            </React.Fragment>
        );

        return (
            <PlanePreview
                header={previewHeader}
                content={previewContent}/>
        );
    }

    renderPreviewFooter () {
        const { saveText } = this.props;

        return (
            <EditPolicyFormFooterComponent
                onFormCancel={this.closeEditPolicyPlane}
                onFormSubmit={this.savePolicy}
                saveText={saveText} />
        );
    }

    // React's render
    render () {
        // Data points
        const {
            editPolicyPlaneDisplay,
            preventCloseWhenClicked
        } = this.props;

        return (
            <Plane
                // Behavior/events
                onChange={this.onPlaneChange}
                preventCloseWhenClicked={preventCloseWhenClicked}

                // Appearance
                display={editPolicyPlaneDisplay}
                preview={this.renderPreviewContent}
                previewFooter={this.renderPreviewFooter} />
        );
    }
}

export {
    EditPolicyView
};
