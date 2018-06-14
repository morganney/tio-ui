import { Component } from 'react';
import PropTypes from 'prop-types';

class RepositoryDrilldownLifecycles extends Component {
    static propTypes = {
        // container
        tioRender: PropTypes.func.isRequired
    };

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    RepositoryDrilldownLifecycles
};
