import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { ImagesDetailDigestMessages } from 'tio-container-security/modules/images/messages';
import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/images/constants';

import { ImagesDetailDigest } from './lifecycles';

const mapStateToProps = (state, props) => {
    const {
        currentDetailImage
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;
    let layerDigest = [];

    if (currentDetailImage && currentDetailImage.layers) {
        layerDigest = currentDetailImage.layers;
    }

    // il8n
    const { columnDigest } = ImagesDetailDigestMessages;

    return {
        layerDigest,
        digestColumnMessage: intl.formatMessage(columnDigest)
    };
};

const mapDispatchToProps = null;

const ImagesDetailDigestContainer = compose(
    withRouter,
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(ImagesDetailDigest);

export {
    ImagesDetailDigestContainer
};
