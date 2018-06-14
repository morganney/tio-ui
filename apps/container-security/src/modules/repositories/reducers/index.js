import { repositories } from './repositories';
import { repositoriesError } from './repositories-error';
import { repositoriesFetching } from './repositories-fetching';
import { containerImages } from './container-images';
import { containerImagesError } from './container-images-error';
import { containerImagesFetching } from './container-images-fetching';
import { containerTags } from './container-tags';
import { containerTagsError } from './container-tags-error';
import { containerTagsFetching } from './container-tags-fetching';
import { drilldownRepository } from './drilldown-repository';
import { drilldownContainerImage } from './drilldown-container-image';
import { repositoryTablePlaneDisplay } from './repository-table-plane-display';
import { repositoryDrilldownPlaneDisplay } from './repository-drilldown-plane-display';
import { repositorySearch } from './repository-search';
import { newRepositoryPlaneDisplay } from './new-repository-plane-display';
import { notificationState } from './notification-state';
import { repositoryDeleted } from './repository-deleted';
import { containerTagsTablePlaneDisplay } from './container-tags-table-plane-display';

export {
    // Base state members
    repositories,
    repositoriesError,
    repositoriesFetching,
    drilldownRepository,
    drilldownContainerImage,
    containerImages,
    containerImagesError,
    containerImagesFetching,
    containerTags,
    containerTagsError,
    containerTagsFetching,
    notificationState,
    repositoryDeleted,

    // Plane state members
    repositoryTablePlaneDisplay,
    repositoryDrilldownPlaneDisplay,
    containerTagsTablePlaneDisplay,

    // Search reducer
    repositorySearch,

    // New repository plane state
    newRepositoryPlaneDisplay
};
