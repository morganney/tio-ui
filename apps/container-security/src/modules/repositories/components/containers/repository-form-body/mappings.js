import { connect } from 'react-redux';

import { RepositoryFormBodyLifecycles } from './lifecycles';

const mapStateToProps = null;
const mapDispatchToProps = {};
const RepositoryFormBodyContainer = connect(mapStateToProps, mapDispatchToProps)(RepositoryFormBodyLifecycles);

export {
    RepositoryFormBodyContainer
};
