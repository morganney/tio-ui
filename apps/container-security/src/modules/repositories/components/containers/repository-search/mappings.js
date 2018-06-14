import { connect } from 'react-redux';

import { setSearchTerms } from 'tio-container-security/modules/repositories/actions';

import { RepositorySearchLifecycles } from './lifecycles';

const mapStateToProps = null;
const mapDispatchToProps = { setSearchTerms };
const RepositorySearchContainer = connect(mapStateToProps, mapDispatchToProps)(RepositorySearchLifecycles);

export {
    RepositorySearchContainer
};
