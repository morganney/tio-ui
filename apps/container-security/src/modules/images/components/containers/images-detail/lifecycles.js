import { Component } from 'react';
import PropTypes from 'prop-types';

class ImagesDetail extends Component {
    static propTypes = {
        // Component
        tioRender: PropTypes.func.isRequired
    }

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    ImagesDetail
};
