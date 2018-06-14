import { Component } from 'react';
import PropTypes from 'prop-types';

import { CONNECTOR_REDUX_FORM } from '../../../constants';

class ConnectorFormBodyLifecycles extends Component {
    static propTypes = {
        tioRender: PropTypes.func.isRequired,
        // Dispatches
        change: PropTypes.func.isRequired
    }

    componentDidMount () {
        this.props.change(CONNECTOR_REDUX_FORM);
    }

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    ConnectorFormBodyLifecycles
};
