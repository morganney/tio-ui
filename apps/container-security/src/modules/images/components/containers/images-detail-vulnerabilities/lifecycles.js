import { Component } from 'react';
import PropTypes from 'prop-types';

class ImagesDetailVulnerabilities extends Component {
    static propTypes = {
        // Redux data fields
        imageVulnerabilities: PropTypes.object.isRequired,
        isImageVulnerabilitiesFetching: PropTypes.bool.isRequired,
        currentDetailImage: PropTypes.object.isRequired,

        // Dispatches
        fetchImageVulnerabilities: PropTypes.func.isRequired,

        // Component
        tioRender: PropTypes.func.isRequired
    }

    componentDidMount () {
        const { currentDetailImage, fetchImageVulnerabilities } = this.props;

        if (Object.getOwnPropertyNames(currentDetailImage).length !== 0 && currentDetailImage.digest) {
            fetchImageVulnerabilities(currentDetailImage.digest);
        }
    }

    componentDidUpdate (prevProps) {
        const { currentDetailImage, fetchImageVulnerabilities } = this.props;

        // fetch on selection of a different image (if tab is open)
        if (prevProps.currentDetailImage !== currentDetailImage && currentDetailImage.digest) {
            fetchImageVulnerabilities(currentDetailImage.digest);
        }
    }

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    ImagesDetailVulnerabilities
};
