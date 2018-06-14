import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { ImagesDetailInventory } from './lifecycles';

import { BRANCH_NAME, STEM_NAME } from '../../../constants';
import { fetchImageInventory } from '../../../actions';

const mapStateToProps = (state) => {
    const {
        imageInventory,
        isImageInventoryFetching,
        currentDetailImage
    } = state[BRANCH_NAME][STEM_NAME];

    return {
        imageInventory,
        isImageInventoryFetching,
        currentDetailImage
    };
};

const mapDispatchToProps = {
    fetchImageInventory
};

const ImagesDetailInvContainer = withRouter(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(ImagesDetailInventory))
);

export {
    ImagesDetailInvContainer
};
