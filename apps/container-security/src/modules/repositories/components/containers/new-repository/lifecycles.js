import { Component } from 'react';
import PropTypes from 'prop-types';

class NewRepositoryLifecycles extends Component {
    static propTypes = {
        // container
        tioRender: PropTypes.func.isRequired
    };

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    NewRepositoryLifecycles
};
