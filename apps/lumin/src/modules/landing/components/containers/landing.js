import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { LandingView } from './../presentations';

const Landing = withRouter(
    connect(null, {})(LandingView)
);

export {
    Landing as LandingContainer
};
