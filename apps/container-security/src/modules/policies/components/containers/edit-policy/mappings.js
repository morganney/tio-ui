import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import { messages } from 'tio-container-security/modules/policies';
import {
    editPolicyAndDoPostRender,
    toggleEditPolicyPlane
} from 'tio-container-security/modules/policies/actions';
import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/policies/constants';
import { getInitialPolicyFormValues } from 'tio-container-security/modules/policies/utils';

import { EditPolicyLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    // Unpack state and props
    const { drilldownPolicy, editPolicyPlaneDisplay } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;

    // Message translation
    const { savePolicyButton } = messages.buttons;

    // Props for redux-form
    const initialValues = getInitialPolicyFormValues(drilldownPolicy);

    return {
        // Redux store
        drilldownPolicy,
        editPolicyPlaneDisplay,

        // Props to pass in to the child form components that are bound to redux-form
        initialValues,

        // i18n messages
        saveText: intl.formatMessage(savePolicyButton)
    };
};
const mapDispatchToProps = {
    editPolicy: editPolicyAndDoPostRender,
    toggleEditPolicyPlane
};
const EditPolicyContainer = compose(
    withRouter,
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(EditPolicyLifecycles);

export {
    EditPolicyContainer
};
