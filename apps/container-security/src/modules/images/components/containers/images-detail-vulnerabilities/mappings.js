import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { ImagesDetailVulnerabilities } from './lifecycles';

import { BRANCH_NAME, STEM_NAME } from '../../../constants';
import { fetchImageVulnerabilities, toggleDetailImageVulnPlane, setDetailImageVuln } from '../../../actions';

const mapStateToProps = (state) => {
    const {
        imageVulnerabilities,
        isImageVulnerabilitiesFetching,
        currentDetailImage
    } = state[BRANCH_NAME][STEM_NAME];

    return {
        imageVulnerabilities,
        isImageVulnerabilitiesFetching,
        currentDetailImage
    };
};

const mapDispatchToProps = {
    fetchImageVulnerabilities,
    toggleDetailImageVulnPlane,
    setDetailImageVuln
};

const ImagesDetailVulnsContainer = withRouter(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(ImagesDetailVulnerabilities))
);

export {
    ImagesDetailVulnsContainer
};
