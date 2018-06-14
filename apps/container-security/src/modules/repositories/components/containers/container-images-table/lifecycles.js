import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ContainerImagesTableView } from '../../presentations';

class ContainerImagesTableLifecycles extends Component {
    static propTypes = {
        // Redux state
        drilldownRepository: PropTypes.object,

        // Redux dispatches
        fetchContainerImages: PropTypes.func.isRequired
    };

    componentDidUpdate (prevProps) {
        const {
            drilldownRepository: currentRepository,
            fetchContainerImages
        } = this.props;
        const prevRepository = prevProps.drilldownRepository;

        if (currentRepository) {
            if (!prevRepository || prevRepository.name !== currentRepository.name) {
                fetchContainerImages(currentRepository.name);
            }
        }
    }

    render () {
        return (
            <ContainerImagesTableView {...this.props} />
        );
    }
}

export {
    ContainerImagesTableLifecycles
};
