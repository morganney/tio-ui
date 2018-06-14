import React from 'react';
import PropTypes from 'prop-types';
import { ClickableContainer } from '@hivekit/container';
import { colors } from '@hivekit/core';
import { Flex, Box } from '@hivekit/layout';
import { Text } from '@hivekit/text';

const StatsGraphRepositories = ({
    clickHandler,
    label,
    value,
    pushCount,
    pullCount
}) => {
    return (
        <Box
            overflow='hidden'
            w={1}>
            <ClickableContainer
                onClick={clickHandler}
                backgroundHoverColor={colors.actionBlueLight}
                backgroundClickColor={colors.actionBlueSemiLight}
                p={2}>
                <Flex
                    flexDirection='column'
                    flexWrap='nowrap'>
                    <Box w={1}>
                        <Flex
                            my={1}
                            flexWrap='nowrap'>
                            <Box
                                mr={2}
                                w={1}
                                textalign='center'>
                                <Text
                                    truncate={true}
                                    color={colors.grayDark}
                                    size={0}>
                                    {label}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                    <Box w={1}>
                        <Flex
                            flexWrap='nowrap'
                            alignItems='center'>
                            <Box
                                overflow='hidden'
                                mr={2}
                                w={0.5}
                                textalign='center'>
                                <Text
                                    color={colors.chartBlue}
                                    fontFamily='open_sans_light'
                                    size={8}>
                                    {value}
                                </Text>
                            </Box>
                            <Box
                                overflow='hidden'
                                w={0.5}>
                                <Flex
                                    flexWrap='nowrap'
                                    flexDirection='column'
                                    justifyContent='center'>
                                    <Box w={1}>
                                        <Flex
                                            flexWrap='nowrap'
                                            alignItems='baseline'>
                                            <Box
                                                mr={0}
                                                textalign='center'>
                                                <Text
                                                    truncate={true}
                                                    fontFamily='open_sans_light'
                                                    color={colors.grayDark}
                                                    size={4}>
                                                    {pushCount}
                                                </Text>
                                            </Box>
                                            <Box
                                                textalign='center'>
                                                <Text
                                                    truncate={true}
                                                    size={0}>
                                                    Pushes
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Box>
                                    <Box w={1}>
                                        <Flex
                                            flexWrap='nowrap'
                                            alignItems='baseline'>
                                            <Box
                                                mr={0}
                                                textalign='center'>
                                                <Text
                                                    truncate={true}
                                                    fontFamily='open_sans_light'
                                                    color={colors.grayDark}
                                                    size={4}>
                                                    {pullCount}
                                                </Text>
                                            </Box>
                                            <Box
                                                textalign='center'>
                                                <Text
                                                    truncate={true}
                                                    size={0}>
                                                    Pulls
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </ClickableContainer>
        </Box>
    );
};

StatsGraphRepositories.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    pushCount: PropTypes.number.isRequired,
    pullCount: PropTypes.number.isRequired
};

export {
    StatsGraphRepositories
};
