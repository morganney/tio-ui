import React from 'react';
import { colors, utils } from '@hivekit/core';
import { Popover } from '@hivekit/popover';
import { Text } from '@hivekit/text';
import { Flex, Box } from '@hivekit/layout';

import { MatrixCellComponent } from '../../';
import { COLOR_MAP } from '../../../constants';

const getRowsProp = (visualization) => {
    const matrixData = visualization.data;
    const matrixDefinition = visualization.definition;
    const rows = [];

    // Map cell definition to cell data
    for (let i = 0; i < matrixData.cells.length; i++) {
        const matrixCell = {
            cell: matrixData.cells[i],
            definition: matrixDefinition.cells[i],
            index: i,
            xLabels: matrixData.xLabels
        };

        matrixData.cells[i] = getCellDataProp(matrixCell);
    }

    for (let y = 0; y < matrixDefinition.rows; y++) {
        const row = [];

        for (let x = 0; x < matrixDefinition.columns; x++) {
            row.push(matrixData.cells[x + (y * matrixDefinition.columns)]);
        }

        rows.push(row);
    }

    return rows;
};

const getCellDataProp = (matrixCell) => {
    const { cell, definition, index, xLabels = null } = matrixCell;
    const cellData = cell;
    const defaultOpacity = 0.1;
    const hoverOpacity = 0.4;

    cellData.cellIndex = index;

    if (definition) {
        const tool = definition.dataSource.query.tool;
        let value = cell.value;
        let isIndicator = true;
        let fgColor = COLOR_MAP.fgColor[cell.fgColor] || cell.fgColor;
        let bgColor = COLOR_MAP.bgColor[cell.bgColor] || cell.bgColor;
        let bgHoverColor = utils.colorWithAlpha(bgColor, hoverOpacity);

        cellData.definition = definition;

        // Hover background for indicator cells that are not active
        if (bgColor === colors.white) {
            bgHoverColor = utils.colorWithAlpha(colors.matrixItemText, defaultOpacity);

            // Empty indicator cells
            if (!value) {
                bgHoverColor = colors.white;
            }
        }

        // Indicator matrices do not have xLabels property
        if (xLabels) {
            isIndicator = false;
        }

        // Normal (i.e. non-indicator) matrices should use bgColor as fgColor and use no bgColor.
        // These matrices all use cellType='text' while indicator matrices have 'textCount' or 'meter' cellTypes
        if (cell.cellType !== 'text' && cell.bgColor !== '255,255,255') {
            fgColor = COLOR_MAP.fgColor[cell.bgColor];
            bgColor = colors.white;
            bgHoverColor = utils.colorWithAlpha(fgColor, defaultOpacity);
        }

        if (cell.cellType === 'meter' && value !== 'N/A') {
            value += '%';
        }

        // The values returned for these cells is a ratio that needs to be formatted as a percentage
        if (cell.cellType === 'textRatio') {
            value = getRatioCellLabel(cell.value);
        }

        cellData.label = <MatrixCellComponent
            value={String(value)}
            color={fgColor}
            background={utils.colorWithAlpha(bgColor, defaultOpacity)}
            backgroundHover={bgHoverColor}
            popover={getPopoverContent({ value, fgColor, isIndicator, tool })}
            def={definition} />;
    }

    return cellData;
};

const getRatioCellLabel = (cellValue) => {
    const ratio = cellValue.split(':');
    const percentMultiplier = 100;

    let value = 0;

    if (!isNaN(ratio[0] / ratio[1])) {
        value = Math.round(percentMultiplier * ratio[0] / ratio[1]);
    }

    return `${value}%`;
};

const getPopoverContent = (popoverData) => {
    const { value, fgColor, isIndicator, tool } = popoverData;
    let dataType = 'Assets';

    if (!value) {
        return;
    }

    if (tool === 'vulncount') {
        dataType = 'Vulnerabilities';
    }

    if (isIndicator) {
        return (
            <Popover
                place='top'
                hover={true}>
                <Flex
                    flexDirection='column'>
                    <Box>
                        <Text
                            size={1}
                            color={colors.grayDark}
                            textTransform='uppercase'>
                            {value}
                        </Text>
                    </Box>
                    <Box>
                        <Text size={0}>{dataType}</Text>
                    </Box>
                </Flex>
            </Popover>
        );
    }

    return (
        <Popover
            place='top'
            hover={true}>
            <Flex
                alignItems='center'
                flexWrap='nowrap'>
                <Box mr={2}>
                    <Text size={5} color={fgColor}>{value}</Text>
                </Box>
                <Box>
                    <Text>{dataType}</Text>
                </Box>
            </Flex>
        </Popover>
    );
};

const getColumnHeadersProp = (visualization) => {
    const matrixData = visualization.data;

    return matrixData.xLabels;
};

const getRowHeadersProp = (visualization) => {
    const matrixData = visualization.data;

    return matrixData.yLabels;
};

export {
    getRowsProp,
    getCellDataProp,
    getRatioCellLabel,
    getColumnHeadersProp,
    getRowHeadersProp
};
