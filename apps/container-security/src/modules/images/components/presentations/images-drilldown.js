import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Plane,
    PlanePreviewActionBar,
    PlanePreview,
    PlanePreviewHeader,
    PlanePreviewHeaderView,
    PlanePreviewAttr,
    PlanePreviewAttrGraphic,
    PlanePreviewAttrItem
} from '@hivekit/plane';
import {
    ExportIcon,
    SnapshotIcon,
    ExploitMalwareIcon,
    VulnerabilitiesIcon
} from '@hivekit/icon';
import { Button } from '@hivekit/button';
import { Box, Flex } from '@hivekit/layout';
import { Notification, ShowNotification } from '@hivekit/notification';
import { Text } from '@hivekit/text';
import { colors } from '@hivekit/core';

import { Utils } from 'tio-alloy';
import { Patterns } from 'tio-common';

import { ImagesDetailComponent } from '../';

const { PlanePreviewDetailsPaddingWrapper } = Patterns.plane;

class ImagesDrilldownView extends Component {
    static propTypes = {
        // Redux data fields
        currentDetailImage: PropTypes.object.isRequired,
        imagesTableDetailPlaneDisplay: PropTypes.string.isRequired,
        imageReport: PropTypes.object.isRequired,
        imageReportFetching: PropTypes.bool.isRequired,

        // Redux dispatches
        toggleDetailImagePlane: PropTypes.func.isRequired,
        fetchImageReport: PropTypes.func.isRequired,
        resetImageReport: PropTypes.func.isRequired,

        // il8n messages
        reportSuccessLabel: PropTypes.string.isRequired,
        previewGraphicVulnerabilitiesLabel: PropTypes.string.isRequired,
        previewGraphicMalwareLabel: PropTypes.string.isRequired,
        detailAttrImageIDLabel: PropTypes.string.isRequired,
        detailAttrUploadDateLabel: PropTypes.string.isRequired,
        detailAttrLastUpdatedLabel: PropTypes.string.isRequired,
        detailAttrAnalyzedTimeLabel: PropTypes.string.isRequired,
        detailAttrRepositoryLabel: PropTypes.string.isRequired,
        detailAttrImageLabel: PropTypes.string.isRequired,
        detailAttrDigestLabel: PropTypes.string.isRequired,

        // Formatted data for rendering purposes
        malwareCountFormatted: PropTypes.string.isRequired,
        vulnCountFormatted: PropTypes.string.isRequired
    }

    constructor () {
        super();

        this.onPlaneChange = this.onPlaneChange.bind(this);
        this.actionBarActions = this.actionBarActions.bind(this);
        this.actionBar = this.actionBar.bind(this);
        this.imageDetailContent = this.imageDetailContent.bind(this);
        this.attributes = this.attributes.bind(this);
        this.previewHeader = this.previewHeader.bind(this);
        this.previewContent = this.previewContent.bind(this);
        this.onExportAction = this.onExportAction.bind(this);
        this.notifyAndResetReportState = this.notifyAndResetReportState.bind(this);
    }

    componentDidUpdate () {
        const { imageReport, reportSuccessLabel } = this.props;
        const { payload, errorMessage } = imageReport;

        if (payload) {
            const whiteSpace = 2;
            const stringifiedData = JSON.stringify(payload, null, whiteSpace);
            const url = `data:application/json;charset=utf-8,${encodeURIComponent(stringifiedData)}`;
            const tempAnchor = document.createElement('a');

            tempAnchor.href = url;
            tempAnchor.download = `${payload.image_name}.${payload.docker_image_id}.json`;

            tempAnchor.click();
            tempAnchor.remove();

            this.notifyAndResetReportState('low', reportSuccessLabel);
        } else if (errorMessage) {
            // TODO manage reducer message internationalization
            this.notifyAndResetReportState('error', errorMessage);
        }
    }

    notifyAndResetReportState (status, message) {
        const { resetImageReport } = this.props;

        ShowNotification(
            <Notification
                status={status}
                message={message}
            />
        );

        resetImageReport();
    }

    onPlaneChange (res) {
        const { toggleDetailImagePlane, imagesTableDetailPlaneDisplay } = this.props;

        if (res !== imagesTableDetailPlaneDisplay && res === 'closed') {
            toggleDetailImagePlane(res);
        }
    }

    onExportAction () {
        const { currentDetailImage, fetchImageReport } = this.props;

        fetchImageReport(currentDetailImage.digest);
    }

    actionBarActions () {
        const { imageReportFetching, currentDetailImage } = this.props;
        const hasReport = currentDetailImage && currentDetailImage.hasReport;

        return (
            <Flex>
                <Box m='0px'>
                    <Button onClick={this.onExportAction} disabled={imageReportFetching || !hasReport}>
                        <ExportIcon size={0} />
                    </Button>
                </Box>
            </Flex>
        );
    }

    actionBar () {
        return <PlanePreviewActionBar actions={this.actionBarActions()} />;
    }

    imageDetailHeader () {
        const { score } = this.props.currentDetailImage;

        const {
            vulnCountFormatted,
            malwareCountFormatted
        } = this.props;

        const iconMalware = (
            <ExploitMalwareIcon />
        );

        const iconVuln = (
            <VulnerabilitiesIcon />
        );

        const vulnColor = () => {
            const lowRiskCap = 4;
            const mediumRiskCap = 7;
            let color = colors.statusGreen;
            if (score && score >= lowRiskCap) {
                color = colors.statusOrange;
            }

            if (score && score >= mediumRiskCap) {
                color = colors.statusRed;
            }

            return color;
        };

        const {
            previewGraphicVulnerabilitiesLabel,
            previewGraphicMalwareLabel
        } = this.props;

        const graphicalPreviewItems = (
            <Fragment>
                <PlanePreviewAttrItem px={1} py={0}>
                    <PlanePreviewAttrGraphic
                        key={0}
                        label={vulnCountFormatted}
                        labelSize='22px'
                        description={previewGraphicVulnerabilitiesLabel}
                        icon={iconVuln}
                        iconColor={vulnColor()} />
                </PlanePreviewAttrItem>

                <PlanePreviewAttrItem px={1} py={0}>
                    <PlanePreviewAttrGraphic
                        key={1}
                        label={malwareCountFormatted}
                        labelSize='22px'
                        description={previewGraphicMalwareLabel}
                        icon={iconMalware}
                        iconColor={colors.statusOrange} />
                </PlanePreviewAttrItem>
            </Fragment>
        );

        return <PlanePreviewAttr content={graphicalPreviewItems} />;
    }

    imageDetailContent () {
        // TODO image type data missing, obtain clarification

        const {
            currentDetailImage,
            detailAttrImageIDLabel,
            detailAttrUploadDateLabel,
            detailAttrLastUpdatedLabel,
            detailAttrAnalyzedTimeLabel,
            detailAttrRepositoryLabel,
            detailAttrImageLabel,
            detailAttrDigestLabel
        } = this.props;

        return (
            <Fragment>
                {this.imageDetailHeader()}
                <PlanePreviewAttrItem label={detailAttrImageIDLabel}>
                    <Text size={1}>
                        {currentDetailImage.id || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label={detailAttrUploadDateLabel}>
                    <Text size={1}>
                        {Utils.dateFormat(currentDetailImage.createdAt) || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label={detailAttrLastUpdatedLabel}>
                    <Text size={1}>
                        {Utils.dateFormat(currentDetailImage.updatedAt) || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label={detailAttrAnalyzedTimeLabel}>
                    <Text size={1}>
                        {Utils.dateFormat(currentDetailImage.finishedAt) || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label={detailAttrRepositoryLabel}>
                    <Text size={1}>
                        {currentDetailImage.repoName || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label={detailAttrImageLabel}>
                    <Text size={1}>
                        {currentDetailImage.name || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label={detailAttrDigestLabel}>
                    <Text size={1}>
                        {currentDetailImage.digest || ''}
                    </Text>
                </PlanePreviewAttrItem>
            </Fragment>
        );
    }

    attributes () {
        return (
            <PlanePreviewAttr content={this.imageDetailContent()} />
        );
    }

    previewHeader () {
        // TODO upon hive icon update, use proper icon

        const { name, tag } = this.props.currentDetailImage;
        const content = (
            <PlanePreviewHeaderView
                title={name || ''}
                isTitleEditable={false} />
        );

        return (
            <PlanePreviewHeader
                iconComponent= <SnapshotIcon />
                contentComponent={content}
                labalValue={tag || ''} />
        );
    }

    previewContent () {
        return (
            <React.Fragment>
                {this.actionBar()}
                {this.attributes()}
            </React.Fragment>
        );
    }

    render () {
        const { imagesTableDetailPlaneDisplay } = this.props;
        const renderPreview = () => {
            return (
                <PlanePreview
                    header={this.previewHeader()}
                    content={this.previewContent()}/>
            );
        };
        const renderDetail = () => {
            return (
                <PlanePreviewDetailsPaddingWrapper applyPy={false}>
                    <ImagesDetailComponent/>
                </PlanePreviewDetailsPaddingWrapper>
            );
        };

        return (
            <Plane
                onChange={this.onPlaneChange}

                display={imagesTableDetailPlaneDisplay}
                preview={renderPreview}
                detail={renderDetail}>
            </Plane>
        );
    }
}

export {
    ImagesDrilldownView
};
