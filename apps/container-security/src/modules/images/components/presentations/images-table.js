import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PercentGraph } from '@hivekit/percent-graph';
import { Plane, PlaneFull, PlaneFullHeader } from '@hivekit/plane';
import { SnapshotIcon } from '@hivekit/icon';
import { Table } from '@hivekit/table';
import { colors } from '@hivekit/core';
import { Flex, Box } from '@hivekit/layout';

import { Utils } from 'tio-alloy';
import { Patterns, constants as commonConstants } from 'tio-common';
import { BASE_PATH } from 'tio-container-security/modules/common/constants';
import { ImagesTableMessages } from 'tio-container-security/modules/images/messages';

import { ImagesDrilldownComponent, ImagesAdvancedSearchComponent } from '../';

const { PlaneFullPaddingWrapper } = Patterns.plane;
const { dateFormat, dateFormatStrings } = Utils;
const { DATE_FORMAT_MONTH_DAY_YEAR } = dateFormatStrings;

class ImagesTableView extends Component {
    static propTypes = {
        // Redux data fields
        images: PropTypes.object.isRequired,
        imagesFetching: PropTypes.bool,
        advancedSearchApiFilters: PropTypes.object.isRequired,
        imageSummary: PropTypes.object.isRequired,
        imageTablePlaneDisplay: PropTypes.string.isRequired,

        // Dispatches
        fetchImages: PropTypes.func.isRequired,
        toggleImageTablePlane: PropTypes.func.isRequired,
        toggleDetailImagePlane: PropTypes.func.isRequired,
        setDetailImage: PropTypes.func.isRequired,

        // React-router props
        history: PropTypes.object.isRequired,

        // il8n messages
        summaryCardHighRiskTitle: PropTypes.string.isRequired,
        summaryCardLatestTitle: PropTypes.string.isRequired,

        intl: PropTypes.object.isRequired
    }

    constructor () {
        super();

        this.onCellClicked = this.onCellClicked.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.onPlaneChange = this.onPlaneChange.bind(this);
    }

    onPlaneChange (res) {
        const {
            imageTablePlaneDisplay,
            toggleImageTablePlane,
            history
        } = this.props;

        if (res !== imageTablePlaneDisplay) {
            // Only dispatch the action, if the plane is changing to a NEW state
            toggleImageTablePlane(res);

            // TODO: setTimeout is intended as temporary until a more formal routing transition solution is in place.
            setTimeout(() => {
                history.push(`${BASE_PATH}/dashboard`);
            }, commonConstants.planeTransitionInMs);
        }
    }

    onCellClicked (res) {
        const { toggleDetailImagePlane, setDetailImage } = this.props;

        setDetailImage(res.data);
        toggleDetailImagePlane('partial');
    }

    renderHeaderGraphs () {
        const { imageSummary, summaryCardHighRiskTitle, summaryCardLatestTitle } = this.props;
        const boxWidth = 0.5;
        const summaryDataPayload = imageSummary.payload;

        let imagesTotal = 0;
        let imagesHighRisk = 0;
        let imagesLatest = 0;

        if (summaryDataPayload && summaryDataPayload.dataPoints) {
            [imagesTotal, imagesHighRisk, imagesLatest] = summaryDataPayload.dataPoints;
        }

        return (
            <Flex mt={3}>
                <Box
                    w={boxWidth}
                    pr={3}>
                    <PercentGraph
                        key={0}
                        value={imagesHighRisk}
                        label={summaryCardHighRiskTitle}
                        total={imagesTotal}
                        linecolor={colors.statusRed} />
                </Box>
                <Box w={boxWidth}>
                    <PercentGraph
                        key={1}
                        value={imagesLatest}
                        label={summaryCardLatestTitle}
                        total={imagesTotal}
                        linecolor={colors.actionBlue} />
                </Box>
            </Flex>
        );
    }

    renderHeader () {
        // JSX variables
        const { intl } = this.props;
        const { imagesPlaneFullHeader } = ImagesTableMessages;

        const headerProps = {
            title: intl.formatMessage(imagesPlaneFullHeader),
            icon: <SnapshotIcon />
        };

        return (
            <PlaneFullHeader
                {...headerProps}>
                {this.renderHeaderGraphs()}
            </PlaneFullHeader>
        );
    }

    renderTable () {
        const {
            images,
            imagesFetching,
            fetchImages,
            intl,
            advancedSearchApiFilters
        } = this.props;
        const {
            columnImage,
            columnRepository,
            columnTag,
            columnVulnerabilities,
            columnMalware,
            columnRisk,
            columnAnalyzedTime
        } = ImagesTableMessages;

        const imagesColumns = [
            {
                headerName: intl.formatMessage(columnImage),
                field: 'name',
                suppressSorting: true
            },
            {
                headerName: intl.formatMessage(columnRepository),
                field: 'repoName',
                suppressSorting: true
            },
            {
                headerName: intl.formatMessage(columnTag),
                field: 'tag',
                suppressSorting: true
            },
            {
                headerName: intl.formatMessage(columnVulnerabilities),
                field: 'numberOfVulns',
                suppressSorting: true
            },
            {
                headerName: intl.formatMessage(columnMalware),
                field: 'numberOfMalware',
                suppressSorting: true
            },
            {
                headerName: intl.formatMessage(columnRisk),
                field: 'score',
                suppressSorting: true
            },
            {
                headerName: intl.formatMessage(columnAnalyzedTime),
                field: 'createdAt',
                customCellRenderer: (createdDate) => {
                    return dateFormat(createdDate, DATE_FORMAT_MONTH_DAY_YEAR);
                },
                suppressSorting: true
            }
        ];

        let imagesRecords = [];
        let imagesPagination = {};
        let errorMessage = null;

        if (Array.isArray(images.items)) {
            imagesRecords = images.items;
        }

        if (images.pagination) {
            imagesPagination = images.pagination;
        }

        if (images.errorMessage) {
            errorMessage = images.errorMessage;
        }

        // TODO potentially move the below logic to the container level
        // Helper to handle Table paging in conjuction with advanced search filters
        const fetchImagesWithFilter = (pagingOptions) => {
            const { offset, limit } = pagingOptions;

            advancedSearchApiFilters.offset = offset;
            advancedSearchApiFilters.limit = limit;

            fetchImages(advancedSearchApiFilters);
        };

        const getCheckboxIcon = () => {
            return (
                <SnapshotIcon />
            );
        };

        return (
            <React.Fragment>
                <ImagesAdvancedSearchComponent />
                <PlaneFullPaddingWrapper applyPy={false}>
                    <Table
                        rows={imagesRecords}
                        columns={imagesColumns}

                        error={errorMessage}

                        // checkBox icons
                        checkboxIconComponent={getCheckboxIcon}

                        fetching={imagesFetching}
                        onCellClicked={this.onCellClicked}

                        servicePagingAction={fetchImagesWithFilter}
                        servicePagingResponse={imagesPagination}
                    />
                </PlaneFullPaddingWrapper>
                <ImagesDrilldownComponent />
            </React.Fragment>
        );
    }

    render () {
        const { imageTablePlaneDisplay } = this.props;

        const renderFullContent = () => {
            return (
                <PlaneFull
                    header={this.renderHeader()}
                    content={this.renderTable()} />
            );
        };

        const planeProps = {
            onChange: this.onPlaneChange,
            display: imageTablePlaneDisplay,
            full: renderFullContent
        };

        return (
            <Plane {...planeProps} />
        );
    }
}

export {
    ImagesTableView
};
