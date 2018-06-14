import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { reduxForm } from 'redux-form';

import messages from 'tio-app/messages';
import { Utils } from 'tio-alloy';

import { LoginView } from '../presentations/login';
import { logIn } from '../../actions';
import { BRANCH_NAME } from '../../constants';

const {
    placeholderUsername,
    placeholderPassword
} = messages.forms;
const mapStateToProps = (state, { intl }) => {
    const branch = state[BRANCH_NAME];
    const form = state.form[BRANCH_NAME];
    const usernamePlaceholder = intl.formatMessage(placeholderUsername);
    const passwordPlaceholder = intl.formatMessage(placeholderPassword);
    let hasSyncErrors = false;

    if (branch.token) {
        Utils.storage.set('Iron.token', branch.token);
    }

    if (form && form.syncErrors) {
        hasSyncErrors = true;
    }

    return {
        token: branch.token,
        fetching: branch.fetching,
        networkError: branch.networkError,
        usernamePlaceholder,
        passwordPlaceholder,
        hasSyncErrors
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (values) => {
            dispatch(logIn(values));
        }
    };
};
const LoginContainer = compose(
    withRouter,
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: BRANCH_NAME })
)(LoginView);

export {
    LoginContainer
};
