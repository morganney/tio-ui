import { Component } from 'react';
import PropTypes from 'prop-types';

class ImagesTable extends Component {
    static propTypes = {
        // Dispatches
        fetchImageSummary: PropTypes.func.isRequired,
        toggleImageTablePlane: PropTypes.func.isRequired,

        // Component
        tioRender: PropTypes.func.isRequired
    }

    componentDidMount () {
        const {
            fetchImageSummary,
            toggleImageTablePlane
        } = this.props;

        fetchImageSummary();
        toggleImageTablePlane('full');
    }

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    ImagesTable
};
