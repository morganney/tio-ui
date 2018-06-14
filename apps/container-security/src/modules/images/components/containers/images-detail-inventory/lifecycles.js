import { Component } from 'react';
import PropTypes from 'prop-types';

class ImagesDetailInventory extends Component {
    static propTypes = {
        // Redux data fields
        currentDetailImage: PropTypes.object.isRequired,
        imageInventory: PropTypes.object.isRequired,
        isImageInventoryFetching: PropTypes.bool.isRequired,

        // Dispatches
        fetchImageInventory: PropTypes.func.isRequired,

        // Component
        tioRender: PropTypes.func.isRequired
    }

    componentDidMount () {
        const { currentDetailImage, fetchImageInventory } = this.props;

        fetchImageInventory(currentDetailImage.digest);
    }

    componentDidUpdate (prevProps) {
        const { currentDetailImage, fetchImageInventory } = this.props;

        // fetch on selection of a different image (if tab is open)
        if (prevProps.currentDetailImage !== this.props.currentDetailImage) {
            fetchImageInventory(currentDetailImage.digest);
        }
    }

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    ImagesDetailInventory
};
