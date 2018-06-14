import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import { messages } from 'tio-container-security/modules/policies';
import {
    createPolicyAndDoPostRender,
    toggleNewPolicyPlane
} from 'tio-container-security/modules/policies/actions';
import { BRANCH_NAME, STEM_NAME, REDUX_FORM_NEW_POLICY } from 'tio-container-security/modules/policies/constants';
import { getInitialPolicyFormValues } from 'tio-container-security/modules/policies/utils';

import { NewPolicyLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    const { newPolicyPlaneDisplay } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;

    // i18n messages
    const { createPolicyButton } = messages.buttons;

    // Props for redux-form
    const initialValues = getInitialPolicyFormValues();

    return {
        // Redux store
        newPolicyPlaneDisplay,

        // Props to pass in to the child form components that are bound to redux-form
        initialValues,

        // i18n messages
        saveText: intl.formatMessage(createPolicyButton)
    };
};
const mapDispatchToProps = {
    createPolicy: createPolicyAndDoPostRender,
    toggleNewPolicyPlane
};
const NewPolicyContainer = compose(
    withRouter,
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: REDUX_FORM_NEW_POLICY
    })
)(NewPolicyLifecycles);

export {
    NewPolicyContainer
};
