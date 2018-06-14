import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';

import {
    fetchContainerTags,
    toggleContainerTagsTablePlane
} from 'tio-container-security/modules/repositories/actions';
import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/repositories/constants';
import { messages as repositoriesMessages } from 'tio-container-security/modules/repositories';
import coreMessages from 'tio-app/messages';

import { ContainerTagsTableLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    // Unpack state and props
    const {
        drilldownContainerImage,
        containerTags,
        containerTagsFetching,
        containerTagsError,
        containerTagsTablePlaneDisplay
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;

    // i18n messages
    const {
        containerTagsNameHeader,
        pushCountHeader,
        pullCountHeader,
        sizeHeader,
        vulnerabilitiesCountHeader,
        malwareCountHeader
    } = repositoriesMessages.tables;

    let errMessage = null;

    if (typeof containerTagsError === 'string') {
        const messageObject = coreMessages.notifications[containerTagsError];

        errMessage = intl.formatMessage(messageObject);
    }

    return {
        // Redux store
        drilldownContainerImage,
        containerTags,
        containerTagsFetching,
        containerTagsTablePlaneDisplay,

        // i18n messages
        containerTagsError: errMessage,
        tagHeader: intl.formatMessage(containerTagsNameHeader),
        pushCountHeader: intl.formatMessage(pushCountHeader),
        pullCountHeader: intl.formatMessage(pullCountHeader),
        sizeHeader: intl.formatMessage(sizeHeader),
        vulnerabilitiesCountHeader: intl.formatMessage(vulnerabilitiesCountHeader),
        malwareCountHeader: intl.formatMessage(malwareCountHeader),
        tagCount: intl.formatNumber(containerTags.pagination.total)
    };
};
const mapDispatchToProps = {
    fetchContainerTags,
    toggleContainerTagsTablePlane
};

const ContainerTagsTableContainer = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(ContainerTagsTableLifecycles);

export {
    ContainerTagsTableContainer
};
