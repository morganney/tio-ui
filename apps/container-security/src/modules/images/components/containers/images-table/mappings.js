import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { ImagesTableMessages } from 'tio-container-security/modules/images/messages';

import { ImagesTable } from './lifecycles';

import { BRANCH_NAME, STEM_NAME } from '../../../constants';
import {
    fetchImages,
    fetchImageSummary,
    toggleDetailImagePlane,
    setDetailImage,
    toggleImageTablePlane
} from '../../../actions';

const mapStateToProps = (state, props) => {
    const {
        images,
        imagesFetching,
        advancedSearchFilters,
        imageSummary,
        isImageSummaryFetching,
        imageTablePlaneDisplay
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;

    // il8n messages
    const { summaryCardHighRisk, summaryCardLatest } = ImagesTableMessages;

    const summaryCardHighRiskTitle = intl.formatMessage(summaryCardHighRisk);
    const summaryCardLatestTitle = intl.formatMessage(summaryCardLatest);

    return {
        images,
        imagesFetching,
        advancedSearchApiFilters: advancedSearchFilters.apiFilters,
        imageSummary,
        isImageSummaryFetching,
        summaryCardHighRiskTitle,
        summaryCardLatestTitle,
        imageTablePlaneDisplay
    };
};

const mapDispatchToProps = {
    fetchImages,
    fetchImageSummary,
    toggleDetailImagePlane,
    setDetailImage,
    toggleImageTablePlane
};

const ImagesTableContainer = compose(
    withRouter,
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(ImagesTable);

export {
    ImagesTableContainer
};
