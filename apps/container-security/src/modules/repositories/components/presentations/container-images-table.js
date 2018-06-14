import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@hivekit/table';

import {
    ContainerTagsTableComponent,
    SizeCellComponent
} from 'tio-container-security/modules/repositories/components';

const ContainerImagesTableView = ({
    // State
    drilldownRepository,
    containerImages,
    containerImagesFetching,
    containerImagesError,

    // i18n messages
    nameHeader,
    malwareCountHeader,
    pushCountHeader,
    pullCountHeader,
    sizeHeader,
    vulnerabilitiesCountHeader,

    // Dispatches
    fetchContainerImages,
    setDrilldownContainerImage,
    toggleContainerTagsTablePlane
}) => {
    // Data points
    const { items, pagination } = containerImages;
    const containerImagesColumns = [
        {
            headerName: nameHeader,
            field: 'name',
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

    // Event listeners
    const onCellClicked = (res) => {
        // Set the appropriate record in the redux store
        setDrilldownContainerImage(res.data);

        // Then, open the plane that will show the info for that specific record
        toggleContainerTagsTablePlane('full');
    };
    const fetchContainerImagesWrapper = (tableFilters) => {
        if (drilldownRepository) {
            fetchContainerImages(drilldownRepository.name, tableFilters);
        }
    };

    // JSX props
    const tableProps = {
        // Data
        rows: items,
        columns: containerImagesColumns,

        // Messages
        error: containerImagesError,

        // States/events
        fetching: containerImagesFetching,
        onCellClicked,

        // Service-side pagination
        servicePagingAction: fetchContainerImagesWrapper,
        servicePagingResponse: pagination,

        // Extra config
        densityToggle: true
    };

    return (
        <React.Fragment>
            <Table {...tableProps} />
            <ContainerTagsTableComponent />
        </React.Fragment>
    );
};

ContainerImagesTableView.propTypes = {
    // State
    drilldownRepository: PropTypes.object,
    containerImages: PropTypes.object.isRequired,
    containerImagesFetching: PropTypes.bool.isRequired,
    containerImagesError: PropTypes.string,

    // i18n messages
    nameHeader: PropTypes.string.isRequired,
    malwareCountHeader: PropTypes.string.isRequired,
    pushCountHeader: PropTypes.string.isRequired,
    pullCountHeader: PropTypes.string.isRequired,
    sizeHeader: PropTypes.string.isRequired,
    vulnerabilitiesCountHeader: PropTypes.string.isRequired,

    // Dispatches
    fetchContainerImages: PropTypes.func.isRequired,
    setDrilldownContainerImage: PropTypes.func.isRequired,
    toggleContainerTagsTablePlane: PropTypes.func.isRequired
};

export {
    ContainerImagesTableView
};
