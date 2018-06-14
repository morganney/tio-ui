import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { ImagesDrilldownMessages } from 'tio-container-security/modules/images/messages';

import { ImagesDrilldown } from './lifecycles';

import { BRANCH_NAME, STEM_NAME } from '../../../constants';
import { toggleDetailImagePlane, fetchImageReport, resetImageReport } from '../../../actions';

const mapStateToProps = (state, props) => {
    const {
        currentDetailImage,
        imagesTableDetailPlaneDisplay,
        imageReport,
        imageReportFetching
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;
    const {
        reportSuccess,
        previewGraphicVulnerabilities,
        previewGraphicMalware,
        detailAttrImageID,
        detailAttrUploadDate,
        detailAttrLastUpdated,
        detailAttrAnalyzedTime,
        detailAttrRepository,
        detailAttrImage,
        detailAttrDigest
    } = ImagesDrilldownMessages;

    // Derivation from props
    let vulnCount = 0;
    let malwareCount = 0;

    if (currentDetailImage) {
        if (typeof currentDetailImage.numberOfVulns === 'number') {
            vulnCount = currentDetailImage.numberOfVulns;
        }
        if (typeof currentDetailImage.numberOfMalware === 'number') {
            malwareCount = currentDetailImage.numberOfMalware;
        }
    }
    // il8n messages
    const reportSuccessLabel = intl.formatMessage(reportSuccess);
    const previewGraphicVulnerabilitiesLabel = intl.formatMessage(previewGraphicVulnerabilities);
    const previewGraphicMalwareLabel = intl.formatMessage(previewGraphicMalware);
    const detailAttrImageIDLabel = intl.formatMessage(detailAttrImageID);
    const detailAttrUploadDateLabel = intl.formatMessage(detailAttrUploadDate);
    const detailAttrLastUpdatedLabel = intl.formatMessage(detailAttrLastUpdated);
    const detailAttrAnalyzedTimeLabel = intl.formatMessage(detailAttrAnalyzedTime);
    const detailAttrRepositoryLabel = intl.formatMessage(detailAttrRepository);
    const detailAttrImageLabel = intl.formatMessage(detailAttrImage);
    const detailAttrDigestLabel = intl.formatMessage(detailAttrDigest);
    // Derived data for rendering purposes
    const vulnCountFormatted = intl.formatNumber(vulnCount);
    const malwareCountFormatted = intl.formatNumber(malwareCount);

    return {
        currentDetailImage,
        imagesTableDetailPlaneDisplay,
        imageReport,
        imageReportFetching,
        reportSuccessLabel,
        previewGraphicVulnerabilitiesLabel,
        previewGraphicMalwareLabel,
        detailAttrImageIDLabel,
        detailAttrUploadDateLabel,
        detailAttrLastUpdatedLabel,
        detailAttrAnalyzedTimeLabel,
        detailAttrRepositoryLabel,
        detailAttrImageLabel,
        detailAttrDigestLabel,

        vulnCountFormatted,
        malwareCountFormatted
    };
};

const mapDispatchToProps = {
    toggleDetailImagePlane,
    fetchImageReport,
    resetImageReport
};

const ImagesDrilldownContainer = withRouter(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(ImagesDrilldown))
);

export {
    ImagesDrilldownContainer
};
