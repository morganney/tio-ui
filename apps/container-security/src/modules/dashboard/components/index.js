import { Utils } from 'tio-alloy';

import {
    DashboardContainer,
    DashboardUsageChartContainer,
    DashboardStatsGraphContainer,
    DashboardConnectorContainer,
    DashboardImagesByOsChartContainer
} from './containers';
import {
    DashboardView,
    DashboardUsageChartView,
    DashboardStatsGraphView,
    DashboardConnectorView,
    DashboardImagesByOsChartView
} from './presentations';

const DashboardComponent = Utils.bindPresentationToContainer(DashboardView, DashboardContainer);
const DashboardUsageChartComponent = Utils.bindPresentationToContainer(
    DashboardUsageChartView,
    DashboardUsageChartContainer
);
const DashboardStatsGraphComponent = Utils.bindPresentationToContainer(
    DashboardStatsGraphView,
    DashboardStatsGraphContainer
);
const DashboardConnectorComponent = Utils.bindPresentationToContainer(
    DashboardConnectorView,
    DashboardConnectorContainer
);
const DashboardImagesByOsChartComponent = Utils.bindPresentationToContainer(
    DashboardImagesByOsChartView,
    DashboardImagesByOsChartContainer
);
export {
    DashboardComponent,
    DashboardUsageChartComponent,
    DashboardStatsGraphComponent,
    DashboardConnectorComponent,
    DashboardImagesByOsChartComponent
};
