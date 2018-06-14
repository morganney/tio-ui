import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { ImagesDetail } from './lifecycles';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = {};

const ImagesDetailContainer = withRouter(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(ImagesDetail))
);

export {
    ImagesDetailContainer
};
