import { submit } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CredentialFormPlaneView } from '../presentations';
import { BRANCH_NAME, STEM_NAME } from '../../constants';
import { STEM_NAME as CREDENTIAL_STEM_NAME } from '../../../credentials/constants';

const mapStateToProps = (state, props) => {
    const { configurationsList } = state[BRANCH_NAME][STEM_NAME];
    const { credentialCrudAction } = state[BRANCH_NAME][CREDENTIAL_STEM_NAME];
    const crudAction = props.history.location.pathname.match(/\/edit\//gi) ? 'edit' : 'add';

    const { match, history } = props;
    const isCredentialFormView = history.location.pathname.match(new RegExp(`${match.path}/(add|edit)`)) !== null;

    return {
        configurationsList,
        credentialCrudAction,
        crudAction,
        isCredentialFormView
    };
};

const mapDispatchToProps = {
    submit
};

const CredentialFormPlaneContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CredentialFormPlaneView)
);

export {
    CredentialFormPlaneContainer
};
