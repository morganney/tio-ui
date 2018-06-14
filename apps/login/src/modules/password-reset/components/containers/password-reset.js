import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Utils } from 'tio-alloy';

import PasswordReset from '../views/password-reset';
import {
    enterUsername,
    enterCaptchaAnswer,
    passwordReset,
    validationError,
    focusFormField
} from '../../actions';
import { BRANCH_NAME } from '../../constants';

const captcha = Utils.getCaptcha();
const mapStateToProps = (state) => {
    const branch = state[BRANCH_NAME];

    return {
        username: branch.username,
        captchaAnswer: branch.captchaAnswer,
        sent: branch.sent,
        errors: branch.errors,
        captcha
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onEnterUsername: (username) => {
            dispatch(enterUsername(username));
        },
        onEnterCaptchaAnswer: (answer) => {
            dispatch(enterCaptchaAnswer(answer));
        },
        onFocus: (name) => {
            dispatch(focusFormField(name));
        },
        onSubmit: (username, captchaAnswer, verify) => {
            const error = {};

            if (!username) {
                error.username = 'Username must not be blank.';
            }

            if (parseInt(captchaAnswer, 10) !== verify) {
                error.captcha = 'Incorrect answer.';
            }

            if (Object.keys(error).length) {
                return dispatch(validationError(error));
            }

            dispatch(passwordReset(username));
        }
    };
};
const PasswordResetContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordReset));

export default PasswordResetContainer;
