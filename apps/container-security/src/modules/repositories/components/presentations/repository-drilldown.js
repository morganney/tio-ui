import React from 'react';
import PropTypes from 'prop-types';
import {
    AwsRdsIcon,
    HexIcon,
    TagIcon
} from '@hivekit/icon';
import {
    Plane,
    PlanePreview,
    PlanePreviewHeader,
    PlanePreviewHeaderView,
    PlanePreviewAttr,
    PlanePreviewAttrGraphic,
    PlanePreviewActionBar,
    PlanePreviewAttrItem
} from '@hivekit/plane';
import { Tabs, Tab, TabPanel } from '@hivekit/tabs';
import { Text } from '@hivekit/text';
import { colors } from '@hivekit/core';

import { Patterns } from 'tio-common';

import {
    RepositoryActionsComponent,
    ContainerImagesTableComponent
} from '../';

const { PlanePreviewDetailsPaddingWrapper } = Patterns.plane;

const RepositoryDrilldownView = ({
    // Redux store
    drilldownRepository,
    repositoryDrilldownPlaneDisplay,

    // i18n messages
    containerImagesIconMessage,
    tagIconMessage,
    vulnerabilitiesLabel,
    malwareLabel,
    pushesLabel,
    pullsLabel,
    sizeLabel,

    // Formatted data for rendering purposes
    imagesCountFormatted,
    tagsCountFormatted,
    vulnerabilitiesCountFormatted,
    malwareCountFormatted,
    pushCountFormatted,
    pullCountFormatted,
    sizeFormatted,

    // Redux dispatches
    toggleRepositoryDrilldownPlane
}) => {
    // Event listeners
    const onPlaneChange = (res) => {
        if (res !== repositoryDrilldownPlaneDisplay) {
            toggleRepositoryDrilldownPlane(res);
        }
    };

    // Render helpers
    const renderDrilldownActions = () => {
        // Data points coming through redux store
        const nodeWrapper = {
            data: drilldownRepository || {}
        };

        // JSX markup
        const actions = (
            <RepositoryActionsComponent
                node={nodeWrapper} />
        );

        return (
            <PlanePreviewActionBar
                actions={actions} />
        );
    };

    const renderPreview = () => {
        if (!drilldownRepository) {
            return null;
        }

        // Encapsulated render helpers
        const renderHeader = () => {
            // Data
            const fieldProps = {
                title: drilldownRepository.name,
                titleIsEditable: false,
                description: drilldownRepository.description,
                descriptionIsEditable: false
            };

            // JSX
            const icon = (
                <AwsRdsIcon />
            );
            const content = (
                <PlanePreviewHeaderView {...fieldProps} />
            );

            // Props for return
            const headerProps = {
                iconComponent: icon,
                contentComponent: content
            };

            return (
                <PlanePreviewHeader {...headerProps} />
            );
        };

        const renderContent = () => {
            const renderAttributesHeader = () => {
                const iconPropList = [
                    {
                        label: imagesCountFormatted,
                        description: containerImagesIconMessage,
                        icon: <HexIcon />,
                        iconColor: colors.statusOrange
                    },
                    {
                        label: tagsCountFormatted,
                        description: tagIconMessage,
                        icon: <TagIcon />,
                        iconColor: colors.statusInfo
                    }
                ];
                const icons = iconPropList.map((iconProps, index) => {
                    return (
                        <PlanePreviewAttrItem key={index} px={index > 0 ? 1 : 0} py={0}>
                            <PlanePreviewAttrGraphic {...iconProps} />
                        </PlanePreviewAttrItem>
                    );
                });
                const iconSet = (
                    <React.Fragment>
                        {icons}
                    </React.Fragment>
                );

                return (
                    <React.Fragment>
                        {renderDrilldownActions()}
                        <PlanePreviewAttr content={iconSet} />
                    </React.Fragment>

                );
            };

            const renderAttributesContent = () => {
                return (
                    <React.Fragment>
                        {renderAttributesHeader()}

                        <PlanePreviewAttrItem label={vulnerabilitiesLabel}>
                            <Text size={1}>{vulnerabilitiesCountFormatted}</Text>
                        </PlanePreviewAttrItem>

                        <PlanePreviewAttrItem label={malwareLabel}>
                            <Text size={1}>{malwareCountFormatted}</Text>
                        </PlanePreviewAttrItem>

                        <PlanePreviewAttrItem label={pushesLabel}>
                            <Text size={1}>{pushCountFormatted}</Text>
                        </PlanePreviewAttrItem>

                        <PlanePreviewAttrItem label={pullsLabel}>
                            <Text size={1}>{pullCountFormatted}</Text>
                        </PlanePreviewAttrItem>

                        <PlanePreviewAttrItem label={sizeLabel}>
                            <Text size={1}>{sizeFormatted}</Text>
                        </PlanePreviewAttrItem>
                    </React.Fragment>
                );
            };

            return (
                <React.Fragment>
                    <PlanePreviewAttr content={renderAttributesContent()} />
                </React.Fragment>
            );
        };

        // props for return
        const previewProps = {
            header: renderHeader(),
            content: renderContent()
        };

        return (
            <PlanePreview {...previewProps} />
        );
    };

    const renderDetail = () => {
        // Helpers
        const renderTable = () => {
            return (
                <TabPanel>
                    <ContainerImagesTableComponent />
                </TabPanel>
            );
        };

        // JSX props
        const tabProps = {
            title: 'Container Images',
            componentRenderer: renderTable
        };

        return (
            <PlanePreviewDetailsPaddingWrapper applyPy={false}>
                <Tabs>
                    <Tab {...tabProps} />
                </Tabs>
            </PlanePreviewDetailsPaddingWrapper>
        );
    };

    // Data
    const planeProps = {
        onChange: onPlaneChange,
        display: repositoryDrilldownPlaneDisplay,
        preview: renderPreview,
        detail: renderDetail
    };

    return (
        <Plane {...planeProps} />
    );
};

RepositoryDrilldownView.propTypes = {
    // Redux data
    drilldownRepository: PropTypes.object,
    repositoryDrilldownPlaneDisplay: PropTypes.string.isRequired,

    // i18n messages
    containerImagesIconMessage: PropTypes.string.isRequired,
    tagIconMessage: PropTypes.string.isRequired,
    vulnerabilitiesLabel: PropTypes.string.isRequired,
    malwareLabel: PropTypes.string.isRequired,
    pushesLabel: PropTypes.string.isRequired,
    pullsLabel: PropTypes.string.isRequired,
    sizeLabel: PropTypes.string.isRequired,

    // Formatted data for rendering purposes
    imagesCountFormatted: PropTypes.string.isRequired,
    tagsCountFormatted: PropTypes.string.isRequired,
    vulnerabilitiesCountFormatted: PropTypes.string.isRequired,
    malwareCountFormatted: PropTypes.string.isRequired,
    pushCountFormatted: PropTypes.string.isRequired,
    pullCountFormatted: PropTypes.string.isRequired,
    sizeFormatted: PropTypes.string.isRequired,

    // Redux dispatches
    toggleRepositoryDrilldownPlane: PropTypes.func.isRequired
};

export {
    RepositoryDrilldownView
};
