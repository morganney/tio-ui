import React from 'react';
import { Flex, Box } from '@hivekit/layout';
import { colors } from '@hivekit/core';
import { RingChart } from '@hivekit/ring-chart';
import { Text } from '@hivekit/text';

import { CHART_PALETTE } from '../../../constants';

const getDataProp = (visualization) => {
    const mappedData = [];

    // First position in the cells array is the descriptionHeader value, so start at index 1 to get data values
    for (let i = 1; i < visualization.data.cells.length; i++) {
        const cellValue = visualization.data.cells[i].value.split(':');
        const percent = Math.round((cellValue[0] / cellValue[1]) * 100);

        mappedData.push({
            y: Number(cellValue[0]),
            name: String(visualization.data.yLabels[i]),
            color: CHART_PALETTE[i % CHART_PALETTE.length],
            percent: isNaN(percent) ? 0 : percent
        });
    }

    return mappedData;
};

const getLegendHeaderProp = (visualization) => {
    return visualization.data.xLabels[0];
};

const getLegendItemsProp = (mappedData) => {
    return mappedData.map((legendItem) => {
        let percent = legendItem.percent;

        if (percent === 0 && legendItem.y > 0) {
            percent = '<1';
        }

        return {
            value: `${percent}%`,
            description: legendItem.name,
            color: legendItem.color
        };
    });
};

const getPopoverContentProp = (mappedData) => {
    return (callbackData) => {
        let percent = callbackData.datum.percent;
        const { y: count, name, color } = callbackData.datum;
        const popoverRingChartData = [
            {
                y: percent,
                color
            },
            {
                y: 100 - percent,
                color: colors.grayLight
            }
        ];

        if (percent === 0 && count > 0) {
            percent = '<1';
        }

        return (
            <Flex
                alignItems='center'
                flexWrap='nowrap'>
                <Box mr={2}>
                    <RingChart
                        width='55px'
                        height='55px'
                        data={popoverRingChartData}
                        descriptionDetail={`${percent}%`}
                        descriptionDetailColor={color}/>
                </Box>
                <Box>
                    <Flex
                        flexDirection='column'>
                        <Box>
                            <Text
                                size={2}
                                color={colors.grayDark}>
                                {mappedData.data.xLabels[0]}
                            </Text>
                        </Box>
                        <Box>
                            {`${count} ${name}`}
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        );
    };
};

const getDescriptionHeaderProp = (visualization) => {
    return visualization.data.cells[0].value;
};

const getDescriptionDetailProp = (visualization) => {
    return visualization.data.yLabels[0];
};

export {
    getDataProp,
    getLegendHeaderProp,
    getLegendItemsProp,
    getDescriptionHeaderProp,
    getDescriptionDetailProp,
    getPopoverContentProp
};
