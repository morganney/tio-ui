import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { Container } from '@hivekit/container';
import { colors } from '@hivekit/core';
import { H6 } from '@hivekit/header';
import { Flex, Box } from '@hivekit/layout';
import {
    DuplicateIcon,
    FilterIcon,
    StarIcon,
    TrashIcon
} from '@hivekit/icon';

const DashboardSettingsActionsView = ({
    dashboardData,
    setAsDefaultDashboard,
    filterDashboard,
    duplicateDashboard,
    deleteDashboard,
    setAsDefaultText,
    filterText,
    duplicateText,
    deleteText
}) => {
    const setDefaultDashboard = () => {
        setAsDefaultDashboard(dashboardData.uuid);
    };

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
                                onClick={setDefaultDashboard}
                                mr={1}
                                data-tip={setAsDefaultText}>
                                <StarIcon />
                            </Button>
                        </Box>
                        <Box m='0px'>
                            <Button
                                kind='action'
                                onClick={filterDashboard}
                                mr={1}
                                data-tip={filterText}>
                                <FilterIcon />
                            </Button>
                        </Box>
                        <Box m='0px'>
                            <Button
                                kind='action'
                                onClick={duplicateDashboard}
                                mr={1}
                                data-tip={duplicateText}>
                                <DuplicateIcon />
                            </Button>
                        </Box>
                        <Box m='0px'>
                            <Button
                                kind='action'
                                onClick={deleteDashboard}
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

DashboardSettingsActionsView.propTypes = {
    dashboardData: PropTypes.object.isRequired,
    setAsDefaultDashboard: PropTypes.func.isRequired,
    filterDashboard: PropTypes.func.isRequired,
    duplicateDashboard: PropTypes.func.isRequired,
    deleteDashboard: PropTypes.func.isRequired,
    setAsDefaultText: PropTypes.string.isRequired,
    filterText: PropTypes.string.isRequired,
    duplicateText: PropTypes.string.isRequired,
    deleteText: PropTypes.string.isRequired
};

export {
    DashboardSettingsActionsView
};
