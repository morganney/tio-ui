import { reduxForm } from 'redux-form';

import {
    REDUX_FORM_NEW_POLICY,
    REDUX_FORM_EDIT_POLICY
} from 'tio-container-security/modules/policies/constants';

import {
    // Pure presentation redux-form components
    NameInputView as NameInputComponent,
    RepositoryTypeInputView as RepositoryTypeInputComponent,
    ConditionsTypeInputView as ConditionsTypeInputComponent,
    ConditionsCvssOperatorInputView as ConditionsCvssOperatorInputComponent,
    ConditionsCvssValueInputView as ConditionsCvssValueInputComponent,
    ConditionsCvesValueInputView as ConditionsCvesValueInputComponent,
    ConditionsMalwareValueInputView as ConditionsMalwareValueInputComponent,
    EnforcementTypeInputView as EnforcementTypeInputComponent,
    PriorityInputView as PriorityInputComponent
} from './presentations';
import {
    PolicyActionsContainer as PolicyActionsComponent,
    EditPolicyContainer as EditPolicyComponent,
    NewPolicyContainer as NewPolicyComponent,
    PolicyTableContainer as PolicyTableComponent,
    PolicyFormHeaderContainer as PolicyFormHeaderComponent,
    PolicyFormBodyContainer as PolicyFormBodyComponent,
    PolicyFormFooterContainer as PolicyFormFooterComponent,
    SpecificRepositoryInputContainer as SpecificRepositoryInputComponent
} from './containers';

const NewPolicyFormHeaderComponent = reduxForm({
    form: REDUX_FORM_NEW_POLICY
})(PolicyFormHeaderComponent);
const NewPolicyFormBodyComponent = reduxForm({
    form: REDUX_FORM_NEW_POLICY
})(PolicyFormBodyComponent);
const NewPolicyFormFooterComponent = reduxForm({
    form: REDUX_FORM_NEW_POLICY
})(PolicyFormFooterComponent);

const EditPolicyFormHeaderComponent = reduxForm({
    form: REDUX_FORM_EDIT_POLICY
})(PolicyFormHeaderComponent);
const EditPolicyFormBodyComponent = reduxForm({
    form: REDUX_FORM_EDIT_POLICY
})(PolicyFormBodyComponent);
const EditPolicyFormFooterComponent = reduxForm({
    form: REDUX_FORM_EDIT_POLICY
})(PolicyFormFooterComponent);

export {
    PolicyActionsComponent,
    EditPolicyComponent,
    NewPolicyComponent,
    PolicyTableComponent,
    PolicyFormHeaderComponent,
    PolicyFormBodyComponent,
    PolicyFormFooterComponent,

    // Bind to specific redux form key
    NewPolicyFormHeaderComponent,
    NewPolicyFormBodyComponent,
    NewPolicyFormFooterComponent,
    EditPolicyFormHeaderComponent,
    EditPolicyFormBodyComponent,
    EditPolicyFormFooterComponent,

    // Redux-form fields
    NameInputComponent,
    RepositoryTypeInputComponent,
    SpecificRepositoryInputComponent,
    ConditionsTypeInputComponent,
    ConditionsCvssOperatorInputComponent,
    ConditionsCvssValueInputComponent,
    ConditionsCvesValueInputComponent,
    ConditionsMalwareValueInputComponent,
    EnforcementTypeInputComponent,
    PriorityInputComponent
};
