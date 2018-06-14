import React from 'react';
import { Popover } from '@hivekit/popover';
import { Flex, Box } from '@hivekit/layout';
import { Text } from '@hivekit/text';

import { SEVERITY_GRADIENT_PALETTE } from '../../../constants';

const getDataProp = (visualization) => {
    const palette = SEVERITY_GRADIENT_PALETTE;
    const mappedData = visualization.data.cells.map((item, index) => {
        return {
            label: visualization.data.xLabels[index],
            count: String(item.value),
            color: palette[index % palette.length]
        };
    });

    return mappedData;
};

const getLegendComponentProp = () => {
    const legendItems = (column) => {
        return (
            <Popover
                hover={true}>
                <Flex
                    alignItems='center'
                    flexWrap='nowrap'>
                    <Box mr={2}><Text size={5} color={column.color}>{column.value}</Text></Box>
                    <Box><Text>{column.label}</Text></Box>
                </Flex>
            </Popover>
        );
    };

    return legendItems;
};

const getFilters = (item, vis) => {
    const label = item.label;
    const index = vis.data.xLabels.indexOf(label);
    const filterList = vis.definition.cells;
    const filters = filterList[index].dataSource.query.filters.slice();

    return filters;
};

export {
    getDataProp,
    getLegendComponentProp,
    getFilters
};
