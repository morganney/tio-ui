import { Component } from 'react';
import PropTypes from 'prop-types';

class ImagesDrilldown extends Component {
    static propTypes = {
        // Redux data fields
        currentDetailImage: PropTypes.object.isRequired,
        imagesTableDetailPlaneDisplay: PropTypes.string.isRequired,
        imageReport: PropTypes.object.isRequired,
        imageReportFetching: PropTypes.bool.isRequired,

        // Redux dispatches
        toggleDetailImagePlane: PropTypes.func.isRequired,
        fetchImageReport: PropTypes.func.isRequired,
        resetImageReport: PropTypes.func.isRequired,

        // Component
        tioRender: PropTypes.func.isRequired
    }

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    ImagesDrilldown
};
