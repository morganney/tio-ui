import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/repositories/constants';
import { toggleNewRepositoryPlane } from 'tio-container-security/modules/repositories/actions';

import { NewRepositoryLifecycles } from './lifecycles';

const mapStateToProps = (state) => {
    const { newRepositoryPlaneDisplay } = state[BRANCH_NAME][STEM_NAME];

    return {
        // Redux store
        newRepositoryPlaneDisplay
    };
};
const mapDispatchToProps = { toggleNewRepositoryPlane };
const NewRepositoryContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NewRepositoryLifecycles)
);
export {
    NewRepositoryContainer
};
