import { Utils } from 'tio-alloy';

import {
    ImagesTableContainer,
    ImagesDrilldownContainer,
    ImagesDetailContainer,
    ImagesDetailInvContainer,
    ImagesDetailVulnsContainer,
    ImagesDetailVulnsDrilldownContainer,
    ImagesDetailDigestContainer,
    ImagesDetailMalwareContainer,
    ImagesAdvancedSearchContainer
} from './containers';
import {
    ImagesTableView,
    ImagesDrilldownView,
    ImagesDetailView,
    ImagesDetailInvView,
    ImagesDetailVulnsView,
    ImagesDetailVulnsDrilldownView,
    ImagesDetailDigestView,
    ImagesDetailMalwareView,
    ImagesAdvancedSearchView,

    VulnIconView as VulnIconComponent
} from './presentations';

const ImagesTableComponent = Utils.bindPresentationToContainer(ImagesTableView, ImagesTableContainer);
const ImagesDrilldownComponent = Utils.bindPresentationToContainer(ImagesDrilldownView, ImagesDrilldownContainer);
const ImagesDetailComponent = Utils.bindPresentationToContainer(ImagesDetailView, ImagesDetailContainer);
const ImagesDetailInvComponent = Utils.bindPresentationToContainer(ImagesDetailInvView, ImagesDetailInvContainer);
const ImagesDetailVulnsComponent = Utils.bindPresentationToContainer(ImagesDetailVulnsView, ImagesDetailVulnsContainer);
const ImagesDetailVulnsDrilldownComponent = Utils.bindPresentationToContainer(
    ImagesDetailVulnsDrilldownView,
    ImagesDetailVulnsDrilldownContainer
);
const ImagesDetailDigestComponent = Utils.bindPresentationToContainer(
    ImagesDetailDigestView,
    ImagesDetailDigestContainer
);
const ImagesDetailMalwareComponent = Utils.bindPresentationToContainer(
    ImagesDetailMalwareView,
    ImagesDetailMalwareContainer
);
const ImagesAdvancedSearchComponent = Utils.bindPresentationToContainer(
    ImagesAdvancedSearchView,
    ImagesAdvancedSearchContainer
);

export {
    ImagesTableComponent,
    ImagesDrilldownComponent,
    ImagesDetailComponent,
    ImagesDetailInvComponent,
    ImagesDetailVulnsComponent,
    ImagesDetailVulnsDrilldownComponent,
    ImagesDetailDigestComponent,
    ImagesDetailMalwareComponent,
    ImagesAdvancedSearchComponent,
    VulnIconComponent
};
