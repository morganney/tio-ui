import { PolicyActionsView } from './policy-actions';
import { EditPolicyView } from './edit-policy';
import { NewPolicyView } from './new-policy';
import { PolicyTableView } from './policy-table';
import { PolicyFormHeaderView } from './policy-form-header';
import { PolicyFormBodyView } from './policy-form-body';
import { PolicyFormFooterView } from './policy-form-footer';
import { NameInputView } from './inputs/name-input';
import { RepositoryTypeInputView } from './inputs/repository-type-input';
import { SpecificRepositoryInputView } from './inputs/specific-repository-input';
import { ConditionsTypeInputView } from './inputs/conditions-type-input';
import { ConditionsCvssOperatorInputView } from './inputs/conditions-cvss-operator-input';
import { ConditionsCvssValueInputView } from './inputs/conditions-cvss-value-input';
import { ConditionsCvesValueInputView } from './inputs/conditions-cves-value-input';
import { ConditionsMalwareValueInputView } from './inputs/conditions-malware-value-input';
import { EnforcementTypeInputView } from './inputs/enforcement-type-input';
import { PriorityInputView } from './inputs/priority-input';

export {
    PolicyActionsView,
    EditPolicyView,
    NewPolicyView,
    PolicyTableView,
    PolicyFormHeaderView,
    PolicyFormBodyView,
    PolicyFormFooterView,

    // Redux-form input components
    NameInputView,
    RepositoryTypeInputView,
    SpecificRepositoryInputView,
    ConditionsTypeInputView,
    ConditionsCvssOperatorInputView,
    ConditionsCvssValueInputView,
    ConditionsCvesValueInputView,
    ConditionsMalwareValueInputView,
    EnforcementTypeInputView,
    PriorityInputView
};
