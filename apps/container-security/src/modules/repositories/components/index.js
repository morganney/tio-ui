import { injectIntl } from 'react-intl';

import { Utils } from 'tio-alloy';

import {
    RepositoryTableView,
    RepositoryDrilldownView,
    RepositorySearchView,
    RepositoryFormBodyView,
    NewRepositoryView,
    SizeCellView
} from './presentations';
import {
    RepositoryTableContainer,
    RepositoryDrilldownContainer,
    RepositorySearchContainer,
    RepositoryFormBodyContainer,
    NewRepositoryContainer,
    RepositoryActionsContainer,
    ContainerImagesTableContainer,
    ContainerTagsTableContainer
} from './containers';

const RepositoryTableComponent = Utils.bindPresentationToContainer(
    RepositoryTableView,
    RepositoryTableContainer
);
const RepositoryDrilldownComponent = Utils.bindPresentationToContainer(
    RepositoryDrilldownView,
    RepositoryDrilldownContainer
);

const RepositorySearchComponent = Utils.bindPresentationToContainer(
    RepositorySearchView,
    RepositorySearchContainer
);

const RepositoryFormBodyComponent = Utils.bindPresentationToContainer(
    RepositoryFormBodyView,
    RepositoryFormBodyContainer
);

const NewRepositoryComponent = Utils.bindPresentationToContainer(
    NewRepositoryView,
    NewRepositoryContainer
);

const SizeCellComponent = injectIntl(SizeCellView);

export {
    RepositoryTableComponent,
    RepositoryDrilldownComponent,
    RepositorySearchComponent,
    RepositoryFormBodyComponent,
    NewRepositoryComponent,
    RepositoryActionsContainer as RepositoryActionsComponent,
    ContainerImagesTableContainer as ContainerImagesTableComponent,
    ContainerTagsTableContainer as ContainerTagsTableComponent,
    SizeCellComponent
};
