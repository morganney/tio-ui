import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { Container } from '@hivekit/container';
import { colors } from '@hivekit/core';
import { H6 } from '@hivekit/header';
import { Flex, Box } from '@hivekit/layout';
import { DuplicateIcon, TrashIcon } from '@hivekit/icon';

const DashboardWidgetSettingsActionsView = ({
    duplicateDashboardWidget,
    deleteDashboardWidget,
    duplicateText,
    deleteText
}) => {
    const actionBarActions = () => {
        return (
            <Flex
                width='100%'
                align='center'>
                <Box py={1}>
                    <H6 color={colors.grayDark}>ACTIONS</H6>
                </Box>
                <Box
                    p={1}
                    ml='auto'>
                    <Flex>
                        <Box m='0px'>
                            <Button
                                kind='action'
                                onClick={duplicateDashboardWidget}
                                mr={1}
                                data-tip={duplicateText}>
                                <DuplicateIcon />
                            </Button>
                        </Box>
                        <Box m='0px'>
                            <Button
                                kind='action'
                                onClick={deleteDashboardWidget}
                                data-tip={deleteText}>
                                <TrashIcon />
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        );
    };

    return (
        <Container
            width='auto'
            height='auto'
            borderTopColor={colors.grayLight}
            borderBottomColor={colors.grayLight}
            borderTopWidth='1px'
            borderBottomWidth='1px'>
            {actionBarActions()}
        </Container>
    );
};

DashboardWidgetSettingsActionsView.propTypes = {
    duplicateDashboardWidget: PropTypes.func.isRequired,
    deleteDashboardWidget: PropTypes.func.isRequired,
    duplicateText: PropTypes.string.isRequired,
    deleteText: PropTypes.string.isRequired
};

export {
    DashboardWidgetSettingsActionsView
};
