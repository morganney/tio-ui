import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';

import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/policies/constants';
import { messages as policiesMessages } from 'tio-container-security/modules/policies';
import coreMessages from 'tio-app/messages';

import { PolicyFormBodyLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    // Unpack state and props
    const { drilldownPolicy } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;

    // i18n messages
    const {
        repositoriesLabel,
        allRepositoriesLabel,
        specificRepositoryLabel,
        specificRepositoryPlaceholder,
        conditionsLabel,
        cvssLabel,
        cvssValuePlaceholder,
        cveLabel,
        cvesPlaceholder,
        malwareLabel,
        enforcementLabel,
        failBuildLabel,
        blockLabel,
        priorityLabel
    } = policiesMessages.forms;
    const { trueInputLabel, falseInputLabel } = coreMessages.forms;

    return {
        // Redux data
        drilldownPolicy,

        // i18n messages
        repositoriesLabel: intl.formatMessage(repositoriesLabel),
        allRepositoriesLabel: intl.formatMessage(allRepositoriesLabel),
        specificRepositoryLabel: intl.formatMessage(specificRepositoryLabel),
        specificRepositoryPlaceholder: intl.formatMessage(specificRepositoryPlaceholder),
        conditionsLabel: intl.formatMessage(conditionsLabel),
        cvssLabel: intl.formatMessage(cvssLabel),
        cvssValuePlaceholder: intl.formatMessage(cvssValuePlaceholder),
        cveLabel: intl.formatMessage(cveLabel),
        cvesPlaceholder: intl.formatMessage(cvesPlaceholder),
        malwareLabel: intl.formatMessage(malwareLabel),
        malwareTrueLabel: intl.formatMessage(trueInputLabel),
        malwareFalseLabel: intl.formatMessage(falseInputLabel),
        enforcementLabel: intl.formatMessage(enforcementLabel),
        failBuildLabel: intl.formatMessage(failBuildLabel),
        blockLabel: intl.formatMessage(blockLabel),
        priorityLabel: intl.formatMessage(priorityLabel)
    };
};
const mapDispatchToProps = {};
const PolicyFormBodyContainer = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(PolicyFormBodyLifecycles);

export {
    PolicyFormBodyContainer
};
