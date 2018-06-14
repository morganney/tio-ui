import React from 'react';
import { StackedBarChart } from '@hivekit/bar-chart';
import { Cell } from '@hivekit/table';
import { Text } from '@hivekit/text';

import { SEVERITY_LEVELS, SEVERITY_PALETTE } from '../../../constants';

const getSeverityDataProp = (data) => {
    const severityData = [];

    for (const severityKey in data.value.data) {
        const severity = severityKey.replace('severity', '').toLowerCase();
        const label = `${severity[0].toUpperCase()}${severity.slice(1)}`;
        const count = data.value.data[severityKey];

        severityData.push({ severity, label, count });
    }

    severityData.reverse();

    return severityData;
};

const barGraphRenderer = (data) => {
    const severityData = getSeverityDataProp(data);

    return (
        <Cell>
            <StackedBarChart
                showLabels={false}
                data={severityData} />
        </Cell>
    );
};

const textRenderer = (data) => {
    return (<Cell>{data.value ? data.value : 'N/A'}</Cell>);
};

const severityRenderer = (data) => {
    const color = SEVERITY_PALETTE[SEVERITY_LEVELS.indexOf(data.value)];

    return (<Cell><Text color={color}>{data.value}</Text></Cell>);
};

const getRowsProp = (visualization) => {
    if (visualization.data.data) {
        const rows = [];
        const visualizationData = visualization.data.data;
        const rowCount = visualizationData[0].data.length;

        for (let i = 0; i < rowCount; i++) {
            const rowData = { id: i };

            visualizationData.forEach((column) => {
                const columnKey = column.label.replace(/ /g, '');

                rowData[columnKey] = column.data[i];
            });

            rows.push(rowData);
        }

        return rows;
    }
};

const getColumnsProp = (visualization, renderText, renderVulnBarGraph) => {
    if (visualization.data.data) {
        const visualizationData = visualization.data.data;

        const columns = visualizationData.map((column) => {
            const label = column.label.trim();
            let renderer = renderText;

            if (label === 'Vulnerabilities' && column.data.length && column.data[0].type === 'vulnBar') {
                renderer = renderVulnBarGraph;
            }

            if (label === 'Severity') {
                renderer = severityRenderer;
            }

            return {
                headerName: label,
                field: label.replace(/ /g, ''),
                customCellRenderer: renderer
            };
        });

        return columns;
    }
};

const addSumIdFilters = (list, id) => {
    const clonedList = [...list];

    clonedList.push({
        name: 'plugin.id',
        typeCheck: 'eq',
        values: id
    });

    return clonedList;
};

const addSumCveFilters = (list, id) => {
    const clonedList = [...list];

    clonedList.push({
        name: 'plugin.attributes.cve.raw',
        typeCheck: 'match',
        values: id
    });

    return clonedList;
};

export {
    getSeverityDataProp,
    barGraphRenderer,
    textRenderer,
    severityRenderer,
    getRowsProp,
    getColumnsProp,
    addSumIdFilters,
    addSumCveFilters
};
