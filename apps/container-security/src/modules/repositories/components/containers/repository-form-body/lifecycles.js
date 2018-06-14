import { Component } from 'react';
import PropTypes from 'prop-types';

class RepositoryFormBodyLifecycles extends Component {
    static propTypes = {
        tioRender: PropTypes.func.isRequired
    }

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    RepositoryFormBodyLifecycles
};
