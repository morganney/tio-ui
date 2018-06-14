import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { colors } from '@hivekit/core';
import { Container } from '@hivekit/container';
import { SettingsIcon } from '@hivekit/icon';
import { Flex, Box } from '@hivekit/layout';

import { FilterBadgeComponent } from '../';

const DashboardSettingsWidget = ({
    widgetData,
    onItemClick,
    targetGroups
}) => {
    const renderFilterBadge = () => {
        if (widgetData.focusFilter) {
            return (
                <FilterBadgeComponent
                    widgetData={widgetData}
                    targetGroups={targetGroups} />
            );
        }
    };
    const openWidgetSettings = () => {
        onItemClick(widgetData.uuid);
    };

    return (
        <Container
            width='100%'
            backgroundColor={colors.grayLight}
            mb={2}
            px={2}
            py={1}>
            <Flex
                width='100%'
                alignItems='center'>
                <Box
                    width='75%'
                    fontSize={1}>
                    {widgetData.name}
                </Box>
                <Box ml='auto'>
                    <Button onClick={openWidgetSettings}>
                        <SettingsIcon />
                    </Button>
                </Box>
            </Flex>
            <Flex>
                <Box>
                    {renderFilterBadge()}
                </Box>
            </Flex>
        </Container>
    );
};

DashboardSettingsWidget.propTypes = {
    widgetData: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
    targetGroups: PropTypes.array.isRequired
};

export {
    DashboardSettingsWidget
};
