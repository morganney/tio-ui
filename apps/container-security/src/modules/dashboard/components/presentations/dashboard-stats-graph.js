import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@hivekit/layout';
import { colors } from '@hivekit/core';
import { Container } from '@hivekit/container';
import { Divider } from '@hivekit/divider';

import { Patterns } from 'tio-common';

const { StatsGraphBase, StatsGraphRepositories } = Patterns.statsGraph;

const DashboardStatsGraphView = ({
    // State
    imagesCount,
    policiesCount,
    repositoriesCount,
    pushesCount,
    pullsCount,

    // React-router props
    match,
    history,

    // Dispatches
    toggleRepositoryTablePlane
}) => {
    // Event handlers
    const handleOnImagesClick = () => {
        history.push(`${match.path}/images`);
    };

    const handleOnPolicyClick = () => {
        // Push the proper route for react-router
        history.push(`${match.path}/policies`);
    };

    const handleOnRepositoryClick = () => {
        toggleRepositoryTablePlane('full');
    };

    // JSX props
    const imageStatsProps = {
        clickHandler: handleOnImagesClick,
        label: 'IMAGES',
        value: imagesCount
    };

    const policiesStatsProps = {
        clickHandler: handleOnPolicyClick,
        label: 'POLICIES',
        value: policiesCount
    };

    const repositoriesStatsProps = {
        clickHandler: handleOnRepositoryClick,
        label: 'REPOSITORIES',
        value: repositoriesCount,
        pushCount: pushesCount,
        pullCount: pullsCount
    };

    const divider = (
        <Box
            w='1px'
            p={2}>
            <Divider
                direction='vertical'
                color={colors.gray} />
        </Box>
    );

    return (
        <Container
            backgroundGradients={[colors.grayLight, 'transparent']}
            p={2}>
            <Flex
                alignItems='stretch'
                flexWrap='nowrap'>
                <StatsGraphBase {...imageStatsProps} />
                {divider}
                <StatsGraphBase {...policiesStatsProps} />
                {divider}
                <StatsGraphRepositories {...repositoriesStatsProps} />
            </Flex>
        </Container>
    );
};

DashboardStatsGraphView.propTypes = {
    // State
    imagesCount: PropTypes.number.isRequired,
    policiesCount: PropTypes.number.isRequired,
    repositoriesCount: PropTypes.number.isRequired,
    pushesCount: PropTypes.number.isRequired,
    pullsCount: PropTypes.number.isRequired,

    // React-Router props
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // Dispatches
    toggleRepositoryTablePlane: PropTypes.func.isRequired
};

export {
    DashboardStatsGraphView
};
