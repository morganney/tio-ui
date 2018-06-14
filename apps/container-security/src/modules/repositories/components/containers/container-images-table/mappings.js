import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';

import {
    fetchContainerImages,
    setDrilldownContainerImage,
    toggleContainerTagsTablePlane
} from 'tio-container-security/modules/repositories/actions';
import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/repositories/constants';
import { messages as repositoriesMessages } from 'tio-container-security/modules/repositories';
import coreMessages from 'tio-app/messages';

import { ContainerImagesTableLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    // Unpack state and props
    const {
        drilldownRepository,
        containerImages,
        containerImagesFetching,
        containerImagesError
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;

    // i18n messages
    const {
        containerImagesNameHeader,
        malwareCountHeader,
        pushCountHeader,
        pullCountHeader,
        sizeHeader,
        vulnerabilitiesCountHeader
    } = repositoriesMessages.tables;

    let errMessage = null;

    if (typeof containerImagesError === 'string') {
        const messageObject = coreMessages.notifications[containerImagesError];

        errMessage = intl.formatMessage(messageObject);
    }

    return {
        // Redux store
        drilldownRepository,
        containerImages,
        containerImagesFetching,

        // i18n messages
        containerImagesError: errMessage,
        nameHeader: intl.formatMessage(containerImagesNameHeader),
        malwareCountHeader: intl.formatMessage(malwareCountHeader),
        pushCountHeader: intl.formatMessage(pushCountHeader),
        pullCountHeader: intl.formatMessage(pullCountHeader),
        sizeHeader: intl.formatMessage(sizeHeader),
        vulnerabilitiesCountHeader: intl.formatMessage(vulnerabilitiesCountHeader)
    };
};
const mapDispatchToProps = {
    fetchContainerImages,
    setDrilldownContainerImage,
    toggleContainerTagsTablePlane
};
const ContainerImagesTableContainer = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(ContainerImagesTableLifecycles);

export {
    ContainerImagesTableContainer
};
