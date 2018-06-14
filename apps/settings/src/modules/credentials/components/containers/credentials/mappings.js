import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CredentialsLifeCycles } from './lifecycles';
import { BRANCH_NAME, STEM_NAME } from './../../../constants';
import {
    fetchCredentials,
    fetchCredentialsFilters,
    setCredentialsFetchOptions,
    setNotificationState
} from './../../../actions';

const mapStateToProps = (state) => {
    const {
        credentials,
        credentialsFetchOptions,
        credentialsFetching,
        credentialsFilters,
        notificationState
    } = state[BRANCH_NAME][STEM_NAME];

    return {
        credentials,
        credentialsFetchOptions,
        credentialsFetching,
        credentialsFilters,
        notificationState
    };
};

const mapDispatchToProps = {
    fetchCredentials,
    fetchCredentialsFilters,
    setCredentialsFetchOptions,
    setNotificationState
};

const CredentialsContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CredentialsLifeCycles)
);

export {
    CredentialsContainer
};
