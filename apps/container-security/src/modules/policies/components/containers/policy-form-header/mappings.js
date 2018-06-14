import { connect } from 'react-redux';
import { compose } from 'recompose';

import { PolicyFormHeaderLifecycles } from './lifecycles';

const mapStateToProps = null;
const mapDispatchToProps = {};
const PolicyFormHeaderContainer = compose(
    connect(mapStateToProps, mapDispatchToProps)
)(PolicyFormHeaderLifecycles);
export {
    PolicyFormHeaderContainer
};
