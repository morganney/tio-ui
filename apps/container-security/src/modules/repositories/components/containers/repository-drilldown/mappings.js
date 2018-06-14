import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';

import { constants as commonConstants } from 'tio-common';
import { messages as repositoriesMessages } from 'tio-container-security/modules/repositories';
import {
    toggleRepositoryDrilldownPlane
} from 'tio-container-security/modules/repositories/actions';
import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/repositories/constants';

import { RepositoryDrilldownLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    // Unpack state
    const {
        drilldownRepository,
        repositoryDrilldownPlaneDisplay
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;

    // Unpack i18n messages
    const {
        repositoriesContainerImagesIcon,
        repositoriesTagsIcon,
        vulnerabilitiesLabel,
        malwareLabel,
        pushesLabel,
        pullsLabel,
        sizeLabel
    } = repositoriesMessages.forms;

    // Derivation from props
    let imagesCount = 0;
    let tagsCount = 0;
    let vulnerabilitiesCount = 0;
    let malwareCount = 0;
    let pushCount = 0;
    let pullCount = 0;
    let totalBytes = 0;
    const { byteToGibConversionRate } = commonConstants;

    // If a count is available from the backend, format that instead of a default num
    if (drilldownRepository) {
        if (typeof drilldownRepository.imagesCount === 'number') {
            imagesCount = drilldownRepository.imagesCount;
        }

        if (typeof drilldownRepository.labelsCount === 'number') {
            tagsCount = drilldownRepository.labelsCount;
        }

        if (typeof drilldownRepository.vulnerabilitiesCount === 'number') {
            vulnerabilitiesCount = drilldownRepository.vulnerabilitiesCount;
        }

        if (typeof drilldownRepository.malwareCount === 'number') {
            malwareCount = drilldownRepository.malwareCount;
        }

        if (typeof drilldownRepository.pushCount === 'number') {
            pushCount = drilldownRepository.pushCount;
        }

        if (typeof drilldownRepository.pullCount === 'number') {
            pullCount = drilldownRepository.pullCount;
        }

        if (typeof drilldownRepository.totalBytes === 'number') {
            totalBytes = drilldownRepository.totalBytes;
        }
    }

    return {
        // Redux store
        drilldownRepository,
        repositoryDrilldownPlaneDisplay,

        // i18n messages
        containerImagesIconMessage: intl.formatMessage(repositoriesContainerImagesIcon),
        tagIconMessage: intl.formatMessage(repositoriesTagsIcon),
        vulnerabilitiesLabel: intl.formatMessage(vulnerabilitiesLabel),
        malwareLabel: intl.formatMessage(malwareLabel),
        pushesLabel: intl.formatMessage(pushesLabel),
        pullsLabel: intl.formatMessage(pullsLabel),
        sizeLabel: intl.formatMessage(sizeLabel),

        // Derived data for rendering purposes
        imagesCountFormatted: intl.formatNumber(imagesCount),
        tagsCountFormatted: intl.formatNumber(tagsCount),
        vulnerabilitiesCountFormatted: intl.formatNumber(vulnerabilitiesCount),
        malwareCountFormatted: intl.formatNumber(malwareCount),
        pushCountFormatted: intl.formatNumber(pushCount),
        pullCountFormatted: intl.formatNumber(pullCount),
        sizeFormatted: intl.formatNumber(totalBytes * byteToGibConversionRate)
    };
};
const mapDispatchToProps = {
    toggleRepositoryDrilldownPlane
};
const RepositoryDrilldownContainer = compose(
    withRouter,
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(RepositoryDrilldownLifecycles);

export {
    RepositoryDrilldownContainer
};
