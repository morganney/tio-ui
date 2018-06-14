import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/dashboard/constants';
import {
    BRANCH_NAME as REPOS_BRANCH_NAME,
    STEM_NAME as REPOS_STEM_NAME
} from 'tio-container-security/modules/repositories/constants';
import {
    fetchRepositories,
    setNotificationState,
    setDrilldownRepository,
    toggleRepositoryTablePlane,
    toggleRepositoryDrilldownPlane
} from 'tio-container-security/modules/repositories/actions';
import { messages as repositoriesMessages } from 'tio-container-security/modules/repositories';
import coreMessages from 'tio-app/messages';

import { RepositoryTableLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    const { organizationStats } = state[BRANCH_NAME][STEM_NAME];

    let repositoriesSummary = '0';
    let pushesSummary = '0';
    let pullsSummary = '0';

    if (organizationStats && organizationStats.payload) {
        repositoriesSummary = organizationStats.payload.repositoryCount.toString();
        pushesSummary = organizationStats.payload.pushCount.toString();
        pullsSummary = organizationStats.payload.pullCount.toString();
    }
    // Unpack state and props
    const {
        repositories,
        repositoriesError,
        repositoriesFetching,
        repositoryTablePlaneDisplay,
        repositorySearch,
        notificationState
    } = state[REPOS_BRANCH_NAME][REPOS_STEM_NAME];
    const { messageKey } = notificationState;
    const { intl } = props;

    // i18n messages
    const {
        imagesCountHeader,
        malwareCountHeader,
        nameHeader,
        pushCountHeader,
        pullCountHeader,
        repositoriesTableTitle,
        sizeHeader,
        tagsCountHeader,
        vulnerabilitiesCountHeader
    } = repositoriesMessages.tables;

    let errMessage = null;
    let notificationMessage = null;

    if (typeof repositoriesError === 'string') {
        const messageObject = coreMessages.notifications[repositoriesError];

        errMessage = intl.formatMessage(messageObject);
    }

    if (typeof messageKey === 'string') {
        const messageObject = repositoriesMessages.notifications[messageKey];

        notificationMessage = intl.formatMessage(messageObject);
    }

    return {
        // Redux store
        repositories,
        repositoriesError: errMessage,
        repositoriesFetching,
        repositoryTablePlaneDisplay,
        repositorySearch,
        // Stats
        repositoriesSummary,
        pushesSummary,
        pullsSummary,
        // Notification mapping from thunks
        notificationType: notificationState.type,

        // i18n messages
        notificationMessage,
        imagesCountHeader: intl.formatMessage(imagesCountHeader),
        nameHeader: intl.formatMessage(nameHeader),
        malwareCountHeader: intl.formatMessage(malwareCountHeader),
        pushCountHeader: intl.formatMessage(pushCountHeader),
        pullCountHeader: intl.formatMessage(pullCountHeader),
        sizeHeader: intl.formatMessage(sizeHeader),
        tagsCountHeader: intl.formatMessage(tagsCountHeader),
        titleText: intl.formatMessage(repositoriesTableTitle),
        vulnerabilitiesCountHeader: intl.formatMessage(vulnerabilitiesCountHeader)
    };
};
const mapDispatchToProps = {
    fetchRepositories,
    setNotificationState,
    setDrilldownRepository,
    toggleRepositoryTablePlane,
    toggleRepositoryDrilldownPlane
};
const RepositoryTableContainer = withRouter(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(RepositoryTableLifecycles))
);

export {
    RepositoryTableContainer
};
