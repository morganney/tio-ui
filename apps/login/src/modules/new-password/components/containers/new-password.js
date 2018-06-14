import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NewPassword from '../views/new-password';
import {
    enterPassword,
    validationError,
    focusFormField,
    newPassword
} from '../../actions';
import { BRANCH_NAME } from '../../constants';

const mapStateToProps = (state) => {
    const branch = state[BRANCH_NAME];

    return {
        password: branch.password,
        reset: branch.reset,
        errors: branch.errors
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (password) => {
            dispatch(enterPassword(password));
        },
        onFocus: (name) => {
            dispatch(focusFormField(name));
        },
        onSubmit: (password, key) => {
            if (!password) {
                return dispatch(validationError(
                    { password: 'Password must not be blank.' }
                ));
            }

            dispatch(newPassword(password, key));
        }
    };
};
const NewPasswordContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NewPassword)
);

export default NewPasswordContainer;
