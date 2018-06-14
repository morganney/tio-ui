import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { colors } from '@hivekit/core';
import { SnapshotIcon, TagIcon } from '@hivekit/icon';
import { Flex, Box } from '@hivekit/layout';
import { Plane } from '@hivekit/plane';
import { Table } from '@hivekit/table';
import { Text } from '@hivekit/text';

import { Patterns } from 'tio-common';
import { SizeCellComponent } from 'tio-container-security/modules/repositories/components';
import { tables as tableMessages } from 'tio-container-security/modules/repositories/messages';

const { PlaneFullPaddingWrapper } = Patterns.plane;

// i18n messages
const { containerTagsTagCountMessage } = tableMessages;

const ContainerTagsTableView = ({
    // State
    drilldownContainerImage,
    containerTags,
    containerTagsFetching,
    containerTagsError,
    containerTagsTablePlaneDisplay,

    // i18n messages
    tagHeader,
    pushCountHeader,
    pullCountHeader,
    sizeHeader,
    vulnerabilitiesCountHeader,
    malwareCountHeader,
    tagCount,

    // Dispatches
    fetchContainerTags,
    toggleContainerTagsTablePlane
}) => {
    // Data points
    const { items, pagination } = containerTags;
    const containerTagsColumns = [
        {
            headerName: tagHeader,
            field: 'tag',
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
            field: 'size',
            suppressSorting: true,
            customCellRenderer: SizeCellComponent
        },
        {
            headerName: vulnerabilitiesCountHeader,
            field: 'numberOfVulns',
            suppressSorting: true
        },
        {
            headerName: malwareCountHeader,
            field: 'numberOfMalware',
            suppressSorting: true
        },
        {
            // type is already implicitly set here by Table, but this makes the intent more explicit UI-side
            headerName: '',
            field: 'actions',
            type: 'densityToggle',
            width: 50
        }
    ];

    // Event handlers
    const onPlaneChange = (res) => {
        if (res !== containerTagsTablePlaneDisplay) {
            // Only dispatch the action, if the plane is changing to a NEW state
            toggleContainerTagsTablePlane(res);
        }
    };
    const fetchContainerTagsWrapper = (tableFilters) => {
        if (drilldownContainerImage) {
            const { repoName, name: imageName } = drilldownContainerImage;

            fetchContainerTags(repoName, imageName, tableFilters);
        }
    };

    // Render helpers
    const renderTable = () => {
        const tableProps = {
            // Data
            rows: items,
            columns: containerTagsColumns,

            // Messages
            error: containerTagsError,

            // States/events
            fetching: containerTagsFetching,

            // Service-side pagination
            servicePagingAction: fetchContainerTagsWrapper,
            servicePagingResponse: pagination,

            // Extra config
            densityToggle: true
        };

        return (
            <Table {...tableProps} />
        );
    };
    const renderFullContent = () => {
        let imageName = '';

        if (drilldownContainerImage) {
            imageName = drilldownContainerImage.name;
        }

        // JSX props
        const imageIconProps = {
            size: 3,
            color: colors.black
        };
        const imageTextProps = {
            display: 'inline-block',
            size: 4,
            ml: 2,
            bold: true
        };
        const tagIconProps = {
            size: 1,
            color: colors.grayDark
        };
        const tagTextProps = {
            display: 'inline-block',
            ml: 1
        };
        const tagCountTextProps = {
            ...containerTagsTagCountMessage,
            values: {
                tagCount: <b>{tagCount}</b>
            }
        };

        return (
            <PlaneFullPaddingWrapper>
                <Flex mt={5} mb={2}>
                    <Box>
                        <SnapshotIcon {...imageIconProps}/>
                        <Text {...imageTextProps}>{imageName}</Text>
                    </Box>
                </Flex>
                <Flex mb={1}>
                    <Box>
                        <TagIcon {...tagIconProps}/>
                        <Text {...tagTextProps}>
                            <FormattedMessage {...tagCountTextProps} />
                        </Text>
                    </Box>
                </Flex>
                {renderTable()}
            </PlaneFullPaddingWrapper>
        );
    };

    // JSX props
    const planeProps = {
        onChange: onPlaneChange,
        display: containerTagsTablePlaneDisplay,
        full: renderFullContent
    };

    // JSX return
    return (
        <Plane {...planeProps} />
    );
};

ContainerTagsTableView.propTypes = {
    // State
    drilldownContainerImage: PropTypes.object,
    containerTags: PropTypes.object.isRequired,
    containerTagsFetching: PropTypes.bool.isRequired,
    containerTagsError: PropTypes.string,

    // Plane state
    containerTagsTablePlaneDisplay: PropTypes.string.isRequired,

    // i18n messages
    tagHeader: PropTypes.string.isRequired,
    pushCountHeader: PropTypes.string.isRequired,
    pullCountHeader: PropTypes.string.isRequired,
    sizeHeader: PropTypes.string.isRequired,
    vulnerabilitiesCountHeader: PropTypes.string.isRequired,
    malwareCountHeader: PropTypes.string.isRequired,
    tagCount: PropTypes.string.isRequired,

    // Dispatches
    fetchContainerTags: PropTypes.func.isRequired,
    toggleContainerTagsTablePlane: PropTypes.func.isRequired
};

export {
    ContainerTagsTableView
};
