import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ImagesDetailVulnsDrilldownLifecycles } from './lifecycles';

import { BRANCH_NAME, STEM_NAME } from '../../../constants';
import { toggleDetailImageVulnPlane } from '../../../actions';

const mapStateToProps = (state) => {
    const {
        currentDetailImageVuln,
        imagesDetailVulnPlaneDisplay
    } = state[BRANCH_NAME][STEM_NAME];

    return {
        currentDetailImageVuln,
        imagesDetailVulnPlaneDisplay
    };
};

const mapDispatchToProps = {
    toggleDetailImageVulnPlane
};

const ImagesDetailVulnsDrilldownContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ImagesDetailVulnsDrilldownLifecycles)
);

export {
    ImagesDetailVulnsDrilldownContainer
};
