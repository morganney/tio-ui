import { connect } from 'react-redux';

import {
    BRANCH_NAME as CORE_BRANCH_NAME,
    STEM_NAME as CORE_STEM_NAME,
    DEFAULTS
} from 'tio-app/modules/session/constants';

import { UserPermissionsPlaneView } from '../presentations';
import { BRANCH_NAME, STEM_NAME } from '../../constants';
import { setUserPermissionsPlaneState } from '../../actions';

const mapStateToProps = (state) => {
    const {
        userPermissionsPlaneState
    } = state[BRANCH_NAME][STEM_NAME];

    const {
        user_name: userName
    } = state[CORE_BRANCH_NAME][CORE_STEM_NAME][DEFAULTS];

    return {
        userPermissionsPlaneState,
        userName
    };
};

const mapDispatchToProps = {
    setUserPermissionsPlaneState
};

const UserPermissionsPlaneContainer = connect(mapStateToProps, mapDispatchToProps)(UserPermissionsPlaneView);

export {
    UserPermissionsPlaneContainer
};
