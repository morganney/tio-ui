// Standard imports and Hivekit imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { TileLayout } from '@hivekit/tile';
import { PageView, PageViewHeader } from '@hivekit/page-view';
import { ContainerIcon } from '@hivekit/icon';

// tio_ui imports
import {
    DashboardUsageChartComponent,
    DashboardStatsGraphComponent,
    DashboardConnectorComponent,
    DashboardImagesByOsChartComponent
} from 'tio-container-security/modules/dashboard/components';
import { PolicyTableComponent } from 'tio-container-security/modules/policies/components';
import { ImagesTableComponent } from 'tio-container-security/modules/images';
import { RepositoryTableComponent } from 'tio-container-security/modules/repositories';
import { CreateConnectorComponent } from 'tio-container-security/modules/connectors';

class DashboardView extends Component {
    static propTypes = {
        // Data fields
        usageHeaderMessage: PropTypes.string.isRequired,
        statisticsHeaderMessage: PropTypes.string.isRequired,

        // React-router props
        match: PropTypes.object.isRequired,

        // il8n messages
        imagesByOsHeaderText: PropTypes.string.isRequired,
        connectorsHeaderText: PropTypes.string.isRequired,
        pageHeaderText: PropTypes.string.isRequired
    }

    constructor () {
        super();

        this.renderHeader = this.renderHeader.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    renderHeader () {
        const { pageHeaderText } = this.props;
        const headerProps = {
            title: pageHeaderText,
            titleIcon: <ContainerIcon />
        };

        return (
            <PageViewHeader {...headerProps} />
        );
    }

    renderContent () {
        const {
            match,
            usageHeaderMessage,
            statisticsHeaderMessage,
            connectorsHeaderText,
            imagesByOsHeaderText
        } = this.props;
        const tileLayout = [
            {
                title: usageHeaderMessage,
                i: '0',
                x: 0,
                y: 2,
                w: 3,
                h: 4,
                isFixed: true
            },
            {
                title: statisticsHeaderMessage,
                i: '1',
                x: 3,
                y: 2,
                w: 6,
                h: 4,
                isFixed: true
            },
            {
                title: connectorsHeaderText,
                i: '2',
                x: 9,
                y: 2,
                w: 3,
                h: 4,
                isFixed: true
            },
            {
                title: imagesByOsHeaderText,
                i: '3',
                x: 0,
                y: 0,
                w: 16,
                h: 4,
                isFixed: true
            }
        ];

        const dashboardTileComponents = [
            <DashboardUsageChartComponent key='1' />,
            <DashboardStatsGraphComponent key='2' />,
            <DashboardConnectorComponent key='3' />,
            <DashboardImagesByOsChartComponent key='4' />
        ];
        // Logged a bug for this to be looked into.
        // https://jira.corp.tenablesecurity.com/browse/PDX-1196

        return (
            <div style={{ width: '100%' }}>
                <RepositoryTableComponent />
                <TileLayout layout={ tileLayout } isDraggable={false}>
                    { dashboardTileComponents }
                </TileLayout>
                <Switch>
                    <Route path={`${match.path}/images`} component={ImagesTableComponent} />
                    <Route path={`${match.path}/policies`} component={PolicyTableComponent} />
                    <Route path={`${match.path}/imports`} component={CreateConnectorComponent} />
                </Switch>
            </div>
        );
    }

    render () {
        const pageViewProps = {
            header: this.renderHeader(),
            content: this.renderContent()
        };

        return (
            <PageView {...pageViewProps} />
        );
    }
}

export {
    DashboardView
};
