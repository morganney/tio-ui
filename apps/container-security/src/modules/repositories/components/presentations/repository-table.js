import React from 'react';
import PropTypes from 'prop-types';
import { AwsRdsIcon, PushIcon, PullIcon } from '@hivekit/icon';
import { Plane, PlaneFull, PlaneFullHeader } from '@hivekit/plane';
import { Table } from '@hivekit/table';
import { colors } from '@hivekit/core';
import { CountGraph } from '@hivekit/count-graph';
import { Flex, Box } from '@hivekit/layout';

import { Patterns } from 'tio-common';
import {
    RepositoryDrilldownComponent,
    RepositorySearchComponent,
    RepositoryActionsComponent,
    SizeCellComponent
} from 'tio-container-security/modules/repositories/components';

const { PlaneFullPaddingWrapper } = Patterns.plane;

const RepositoryTableView = ({
    // Redux store
    repositories,
    repositoriesFetching,
    repositoriesError,
    repositoryTablePlaneDisplay,
    // Stats
    repositoriesSummary,
    pushesSummary,
    pullsSummary,
    // i18n messages
    imagesCountHeader,
    nameHeader,
    malwareCountHeader,
    pushCountHeader,
    pullCountHeader,
    sizeHeader,
    tagsCountHeader,
    titleText,
    vulnerabilitiesCountHeader,

    // Redux dispatches
    fetchRepositories,
    setDrilldownRepository,
    toggleRepositoryTablePlane,
    toggleRepositoryDrilldownPlane
}) => {
    // Event listeners
    const onPlaneChange = (res) => {
        if (res !== repositoryTablePlaneDisplay) {
            // Only dispatch the action, if the plane is changing to a NEW state
            toggleRepositoryTablePlane(res);
        }
    };

    const onCellClicked = (res) => {
        // Set the appropriate record in the redux store
        setDrilldownRepository(res.data);

        // Then, open the plane that will show the info for that specific record
        toggleRepositoryDrilldownPlane('partial');
    };

    const renderCountGraphs = () => {
        const iconProps = {
            color: colors.grayDark,
            size: 1
        };

        const pushIcon = (
            <PushIcon {...iconProps} />
        );

        const pullIcon = (
            <PullIcon {...iconProps} />
        );

        const awsRdsIcon = (
            <AwsRdsIcon {...iconProps} />
        );

        const three = 3;
        const width = 1 / three;

        return (
            <Flex mt={three}>
                <Box w={width} pr={three}>
                    <CountGraph
                        key={0}
                        count={ repositoriesSummary }
                        label={ titleText }
                        icon={ awsRdsIcon } />
                </Box>
                <Box w={width} pr={three}>
                    <CountGraph
                        key={1}
                        count={ pushesSummary }
                        label={ pushCountHeader }
                        icon={ pushIcon } />
                </Box>
                <Box w={width}>
                    <CountGraph
                        key={three}
                        count={ pullsSummary }
                        label={ pullCountHeader }
                        icon={ pullIcon } />
                </Box>
            </Flex>
        );
    };

    // JSX helpers
    const renderHeader = () => {
        const headerTitle = titleText;
        const headerIcon = (
            <AwsRdsIcon />
        );

        const headerProps = {
            title: headerTitle,
            icon: headerIcon
        };

        return (
            <PlaneFullHeader {...headerProps}>
                {renderCountGraphs()}
            </PlaneFullHeader>
        );
    };

    const renderTable = () => {
        const { items, pagination } = repositories;
        const repositoryColumns = [
            {
                headerName: nameHeader,
                field: 'name',
                suppressSorting: true
            },
            {
                headerName: imagesCountHeader,
                field: 'imagesCount',
                suppressSorting: true
            },
            {
                headerName: tagsCountHeader,
                field: 'labelsCount',
                suppressSorting: true
            },
            {
                headerName: vulnerabilitiesCountHeader,
                field: 'vulnerabilitiesCount',
                suppressSorting: true
            },
            {
                headerName: malwareCountHeader,
                field: 'malwareCount',
                suppressSorting: true
            },
            {
                headerName: pushCountHeader,
                field: 'pushCount',
                suppressSorting: true
            },
            {
                headerName: pullCountHeader,
                field: 'pullCount',
                suppressSorting: true
            },
            {
                headerName: sizeHeader,
                field: 'totalBytes',
                suppressSorting: true,
                customCellRenderer: SizeCellComponent
            },
            {
                // type is already implicitly set here by Table, but this makes the intent more explicit UI-side
                headerName: '',
                field: 'actions',
                type: 'densityToggle',
                width: 50,
                customCellRenderer: RepositoryActionsComponent
            }
        ];

        const getCheckboxIcon = () => {
            return (
                <AwsRdsIcon />
            );
        };

        const tableProps = {
            // Data
            rows: items,
            columns: repositoryColumns,

            // Messages
            error: repositoriesError,
            // checkBox icons
            checkboxIconComponent: getCheckboxIcon,

            // States/events
            fetching: repositoriesFetching,
            onCellClicked,

            // Service-side pagination
            servicePagingAction: fetchRepositories,
            servicePagingResponse: pagination,

            // Extra config
            densityToggle: true
        };

        return (
            <React.Fragment>
                <RepositorySearchComponent recordCount={pagination.total.toString()} />
                <PlaneFullPaddingWrapper applyPy={false}>
                    <Table {...tableProps} />
                </PlaneFullPaddingWrapper>
                <RepositoryDrilldownComponent />
            </React.Fragment>
        );
    };

    const renderFullContent = () => {
        const fullProps = {
            header: renderHeader(),
            content: renderTable()
        };

        return (
            <PlaneFull {...fullProps} />
        );
    };

    // Data
    const planeProps = {
        onChange: onPlaneChange,
        display: repositoryTablePlaneDisplay,
        full: renderFullContent
    };

    return (
        <Plane {...planeProps} />
    );
};

RepositoryTableView.propTypes = {
    // Redux data
    repositories: PropTypes.object.isRequired,
    repositoriesFetching: PropTypes.bool.isRequired,
    repositoriesError: PropTypes.string,
    repositoryTablePlaneDisplay: PropTypes.string.isRequired,

    // Stats
    repositoriesSummary: PropTypes.string.isRequired,
    pushesSummary: PropTypes.string.isRequired,
    pullsSummary: PropTypes.string.isRequired,

    // i18n strings
    imagesCountHeader: PropTypes.string.isRequired,
    nameHeader: PropTypes.string.isRequired,
    malwareCountHeader: PropTypes.string.isRequired,
    pullCountHeader: PropTypes.string.isRequired,
    pushCountHeader: PropTypes.string.isRequired,
    sizeHeader: PropTypes.string.isRequired,
    tagsCountHeader: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
    vulnerabilitiesCountHeader: PropTypes.string.isRequired,

    // Redux dispatches
    fetchRepositories: PropTypes.func.isRequired,
    setDrilldownRepository: PropTypes.func.isRequired,
    toggleRepositoryTablePlane: PropTypes.func.isRequired,
    toggleRepositoryDrilldownPlane: PropTypes.func.isRequired
};

export {
    RepositoryTableView
};
