import { Component } from 'react';
import PropTypes from 'prop-types';

class ImagesAdvancedSearchLifecycles extends Component {
    static propTypes = {
        // Redux data fields
        advancedSearchFilters: PropTypes.object.isRequired,

        // Dispatches
        fetchImages: PropTypes.func.isRequired,

        // Component
        tioRender: PropTypes.func.isRequired
    }

    componentDidUpdate (prevProps) {
        const { advancedSearchFilters, fetchImages } = this.props;
        const stringifiedPrevFilters = JSON.stringify(prevProps.advancedSearchFilters.apiFilters);
        const stringifiedCurrentFilters = JSON.stringify(advancedSearchFilters.apiFilters);

        if (stringifiedPrevFilters !== stringifiedCurrentFilters) {
            fetchImages(advancedSearchFilters.apiFilters);
        }
    }

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    ImagesAdvancedSearchLifecycles
};
