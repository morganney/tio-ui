import { connect } from 'react-redux';

import { BRANCH_NAME, STEM_NAME } from '../../../constants';
import { ConnectorsView } from '../../presentations';
import { fetchConnectors } from '../../../actions';

const mapStateToProps = (state) => {
    const {
        connectors,
        connectorsFetching
    } = state[BRANCH_NAME][STEM_NAME];

    return {
        connectors,
        connectorsFetching
    };
};

const mapDispatchToProps = {
    fetchConnectors
};

const ConnectorsContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectorsView);

export {
    ConnectorsContainer
};
