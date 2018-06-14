import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ContainerTagsTableView } from '../../presentations';

class ContainerTagsTableLifecycles extends Component {
    static propTypes = {
        // Redux state
        drilldownContainerImage: PropTypes.object,

        // Redux dispatches
        fetchContainerTags: PropTypes.func.isRequired
    };

    componentDidUpdate (prevProps) {
        const {
            drilldownContainerImage: currentContainerImage,
            fetchContainerTags
        } = this.props;
        const prevContainerImage = prevProps.drilldownContainerImage;

        if (currentContainerImage) {
            if (!prevContainerImage || prevContainerImage.digest !== currentContainerImage.digest) {
                const { repoName, name: imageName } = currentContainerImage;

                fetchContainerTags(repoName, imageName);
            }
        }
    }

    render () {
        return (
            <ContainerTagsTableView {...this.props} />
        );
    }
}

export {
    ContainerTagsTableLifecycles
};
