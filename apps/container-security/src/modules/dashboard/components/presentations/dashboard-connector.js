import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { Container } from '@hivekit/container';
import { colors } from '@hivekit/core';
import { Text } from '@hivekit/text';
import { Box, Flex } from '@hivekit/layout';

const DashboardConnectorView = ({
    // Redux data
    connectorsDescriptionMessage,
    importLinkText,

    // React-router props
    match,
    history
}) => {
    // JSX helpers
    const renderButton = () => {
        const clickHandler = () => {
            // Push the proper route for react-router
            history.push(`${match.path}/imports`);
        };

        const buttonProps = {
            px: 2,
            mt: 2,
            kind: 'primary',
            onClick: clickHandler
        };

        return (
            <Button { ...buttonProps}>
                {importLinkText}
            </Button>
        );
    };
    const renderTextContent = () => {
        const textProps = {
            textAlign: 'center'
        };

        return (
            <Box>
                <Text {...textProps}>
                    {connectorsDescriptionMessage}
                </Text>
            </Box>
        );
    };

    // JSX props
    const containerProps = {
        backgroundGradients: [colors.grayLight, 'transparent'],
        pt: 2,
        px: 2,
        width: '100%'
    };
    const boxProps = {
        py: 2,
        align: 'center',
        m: 'auto'
    };

    return (
        <Container {...containerProps}>
            <Flex p={1}>
                {renderTextContent()}
                <Box {...boxProps}>
                    {renderButton()}
                </Box>
            </Flex>
        </Container>
    );
};

DashboardConnectorView.propTypes = {
    // Redux data
    connectorsDescriptionMessage: PropTypes.string.isRequired,
    importLinkText: PropTypes.string.isRequired,

    // React-router props
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export {
    DashboardConnectorView
};
