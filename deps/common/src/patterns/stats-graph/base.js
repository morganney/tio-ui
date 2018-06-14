import React from 'react';
import PropTypes from 'prop-types';
import { ClickableContainer } from '@hivekit/container';
import { colors } from '@hivekit/core';
import { Flex, Box } from '@hivekit/layout';
import { Text } from '@hivekit/text';

const StatsGraphBase = ({
    clickHandler,
    label,
    value
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
                                w={1}
                                textalign='center'>
                                <Text
                                    color={colors.chartBlue}
                                    fontFamily='open_sans_light'
                                    size={8}>
                                    {value}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </ClickableContainer>
        </Box>
    );
};

StatsGraphBase.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

export {
    StatsGraphBase
};
