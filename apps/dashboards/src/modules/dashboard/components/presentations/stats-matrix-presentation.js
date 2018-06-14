import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@hivekit/layout';
import { Text } from '@hivekit/text';
import { colors } from '@hivekit/core';
import { Container, ClickableContainer } from '@hivekit/container';
import { Divider } from '@hivekit/divider';

const StatsMatrixView = ({ headings, data, labels, definitions, onCellClick }) => {
    const fullWidthBox = { w: 1 };
    const halfWidthBox = { w: 0.5 };
    const boxPadding = { pt: 2, pr: 2, pb: 0, pl: 2 };
    const boxTopMargin = { mt: 1 };
    const boxRightMargin = { mr: 2 };
    const boxLeftMargin = { ml: 1 };
    const overflow = { overflow: 'hidden' };
    const flexWrap = { flexWrap: 'nowrap' };
    const flexColumn = { flexDirection: 'column' };
    const alignCenter = { alignItems: 'center' };
    const alignBaseline = { alignItems: 'baseline' };
    const headingFlexStyle = { my: 1 };
    // The small headings above the statistics
    const headingStyle = {
        truncate: true,
        color: colors.grayDark,
        size: 0
    };
    // The large number on the left side of a box
    const mainStyle = {
        color: colors.grayDark,
        size: 8,
        lineHeight: '1',
        fontFamily: 'open_sans_light',
        display: 'inline'
    };
    // The large number's unit (K, M) when truncated
    const mainAbbreviationStyle = {
        color: colors.grayDark,
        size: 7,
        lineHeight: '1',
        fontFamily: 'open_sans_light',
        display: 'inline'
    };
    // The smaller numbers on the right side of a box
    const altStyle = {
        truncate: true,
        size: 4,
        lineHeight: '1',
        display: 'inline'
    };
    // The small numbers' unit (K, M) when truncated
    const altAbbreviationStyle = {
        truncate: true,
        size: 2,
        lineHeight: '1',
        display: 'inline'
    };
    // The text to the right of the small numbers
    const labelStyle = {
        truncate: true,
        size: 0
    };
    // The "click target" styles
    const drilldownStyle = {
        backgroundHoverColor: colors.graySemiLight,
        backgroundClickColor: colors.gray,
        p: 0
    };
    const dividerBoxStyles = { w: '1px' };
    const dividerStyles = {
        direction: 'vertical',
        color: colors.gray
    };

    return (
        <Container backgroundGradients={[colors.grayLight, 'transparent']} {...boxPadding}>
            <Flex alignItems='stretch' flexWrap='nowrap'>
                <Box {...overflow} {...fullWidthBox} {...boxTopMargin}>
                    <Flex {...flexWrap} {...flexColumn}>
                        <Box {...fullWidthBox}>
                            <Flex {...headingFlexStyle} {...flexWrap}>
                                <Box {...halfWidthBox} {...boxLeftMargin} {...boxRightMargin}>
                                    <Text {...headingStyle}>{headings[0]}</Text>
                                </Box>
                                <Box {...halfWidthBox}>
                                    <Text {...headingStyle}>{headings[1]}</Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box {...fullWidthBox}>
                            <Flex {...flexWrap} {...alignCenter}>
                                <Box {...halfWidthBox} {...boxRightMargin} {...overflow}>
                                    <ClickableContainer
                                        onClick={() => { onCellClick(definitions[0]); }}
                                        {...drilldownStyle}>
                                        <Text {...mainStyle}>{data[0].value}</Text>
                                        <Text {...mainAbbreviationStyle}>{data[0].abbreviation}</Text>
                                    </ClickableContainer>
                                </Box>
                                <Box {...overflow} {...halfWidthBox}>
                                    <Flex {...flexWrap} {...flexColumn}>
                                        <Box {...fullWidthBox} {...boxTopMargin}>
                                            <ClickableContainer
                                                onClick={() => { onCellClick(definitions[1]); }}
                                                {...drilldownStyle}>
                                                <Flex {...flexWrap} {...alignBaseline}>
                                                    <Box mr={0}>
                                                        <Text color={data[1].color} {...altStyle}>{data[1].value}</Text>
                                                        <Text color={data[1].color} {...altAbbreviationStyle}>
                                                            {data[1].abbreviation}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Text {...labelStyle}>{labels[0]}</Text>
                                                    </Box>
                                                </Flex>
                                            </ClickableContainer>
                                        </Box>
                                        <Box {...fullWidthBox}>
                                            <ClickableContainer
                                                onClick={() => { onCellClick(definitions[2]); }}
                                                {...drilldownStyle}>
                                                <Flex {...flexWrap} {...alignBaseline}>
                                                    <Box mr={0}>
                                                        <Text color={data[2].color} {...altStyle}>{data[2].value}</Text>
                                                        <Text color={data[2].color} {...altAbbreviationStyle}>
                                                            {data[2].abbreviation}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Text {...labelStyle}>{labels[1]}</Text>
                                                    </Box>
                                                </Flex>
                                            </ClickableContainer>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>

                <Box {...dividerBoxStyles} {...boxPadding}>
                    <Divider {...dividerStyles}/>
                </Box>

                <Box {...overflow} {...fullWidthBox} {...boxTopMargin}>
                    <Flex {...flexWrap} {...flexColumn}>
                        <Box {...fullWidthBox}>
                            <Flex {...headingFlexStyle} {...flexWrap}>
                                <Box {...halfWidthBox} {...boxLeftMargin} {...boxRightMargin}>
                                    <Text {...headingStyle}>{headings[2]}</Text>
                                </Box>
                                <Box {...halfWidthBox}>
                                    <Text {...headingStyle}>{headings[3]}</Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box {...fullWidthBox}>
                            <Flex {...flexWrap} {...alignCenter}>
                                <Box {...halfWidthBox} {...boxRightMargin} {...overflow}>
                                    <ClickableContainer
                                        onClick={() => { onCellClick(definitions[3]); }}
                                        {...drilldownStyle}>
                                        <Text {...mainStyle}>{data[3].value}</Text>
                                        <Text {...mainAbbreviationStyle}>{data[3].abbreviation}</Text>
                                    </ClickableContainer>
                                </Box>
                                <Box {...overflow} {...halfWidthBox}>
                                    <Flex {...flexWrap} {...flexColumn}>
                                        <Box {...fullWidthBox} {...boxTopMargin}>
                                            <ClickableContainer
                                                onClick={() => { onCellClick(definitions[4]); }}
                                                {...drilldownStyle}>
                                                <Flex {...flexWrap} {...alignBaseline}>
                                                    <Box mr={0}>
                                                        <Text color={data[4].color} {...altStyle}>{data[4].value}</Text>
                                                        <Text color={data[4].color} {...altAbbreviationStyle}>
                                                            {data[4].abbreviation}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Text {...labelStyle}>{labels[2]}</Text>
                                                    </Box>
                                                </Flex>
                                            </ClickableContainer>
                                        </Box>
                                        <Box {...fullWidthBox}>
                                            <ClickableContainer
                                                onClick={() => { onCellClick(definitions[5]); }}
                                                {...drilldownStyle}>
                                                <Flex {...flexWrap} {...alignBaseline}>
                                                    <Box mr={0}>
                                                        <Text color={data[5].color} {...altStyle}>{data[5].value}</Text>
                                                        <Text color={data[5].color} {...altAbbreviationStyle}>
                                                            {data[5].abbreviation}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Text {...labelStyle}>{labels[3]}</Text>
                                                    </Box>
                                                </Flex>
                                            </ClickableContainer>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>

                <Box {...dividerBoxStyles} {...boxPadding}>
                    <Divider {...dividerStyles} />
                </Box>

                <Box {...overflow} {...fullWidthBox} {...boxTopMargin}>
                    <Flex {...flexWrap} {...flexColumn}>
                        <Box {...fullWidthBox}>
                            <Flex {...headingFlexStyle} {...flexWrap}>
                                <Box {...halfWidthBox} {...boxLeftMargin} {...boxRightMargin}>
                                    <Text {...headingStyle}>{headings[4]}</Text>
                                </Box>
                                <Box {...halfWidthBox}>
                                    <Text {...headingStyle}>{headings[5]}</Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box {...fullWidthBox}>
                            <Flex {...flexWrap} {...alignCenter}>
                                <Box {...halfWidthBox} {...boxRightMargin} {...overflow}>
                                    <ClickableContainer
                                        onClick={() => { onCellClick(definitions[6]); }}
                                        {...drilldownStyle}>
                                        <Text {...mainStyle}>{data[6].value}</Text>
                                        <Text {...mainAbbreviationStyle}>{data[6].abbreviation}</Text>
                                    </ClickableContainer>
                                </Box>
                                <Box {...overflow} {...halfWidthBox}>
                                    <Flex {...flexWrap} {...flexColumn}>
                                        <Box {...fullWidthBox} {...boxTopMargin}>
                                            <ClickableContainer
                                                onClick={() => { onCellClick(definitions[7]); }}
                                                {...drilldownStyle}>
                                                <Flex {...flexWrap} {...alignBaseline}>
                                                    <Box mr={0}>
                                                        <Text color={data[7].color} {...altStyle}>{data[7].value}</Text>
                                                        <Text color={data[7].color} {...altAbbreviationStyle}>
                                                            {data[7].abbreviation}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Text {...labelStyle}>{labels[4]}</Text>
                                                    </Box>
                                                </Flex>
                                            </ClickableContainer>
                                        </Box>
                                        <Box {...fullWidthBox}>
                                            <ClickableContainer
                                                onClick={() => { onCellClick(definitions[8]); }}
                                                {...drilldownStyle}>
                                                <Flex {...flexWrap} {...alignBaseline}>
                                                    <Box mr={0}>
                                                        <Text color={data[8].color} {...altStyle}>{data[8].value}</Text>
                                                        <Text color={data[8].color} {...altAbbreviationStyle}>
                                                            {data[8].abbreviation}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Text {...labelStyle}>{labels[5]}</Text>
                                                    </Box>
                                                </Flex>
                                            </ClickableContainer>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>

            </Flex>
        </Container>
    );
};

StatsMatrixView.propTypes = {
    headings: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    definitions: PropTypes.array.isRequired,
    onCellClick: PropTypes.func.isRequired
};

export {
    StatsMatrixView
};
