import React from 'react';
import sortBy from 'lodash/sortBy';

import {
    PieChartComponent,
    BarChartComponent,
    TableComponent,
    MatrixComponent,
    VerticalBarChartComponent,
    MatrixPieChartComponent,
    StatsMatrixComponent
} from '../../';
import {
    VISUALIZATION_WIDGETS,
    TILE_DEFAULTS,
    SEVERITY_LEVELS,
    NEW_FILTER_OPERATORS,
    VULN_API_FILTERS
} from '../../../constants';

const getUuids = (dashboardData) => {
    return dashboardData.components.map((component) => {
        return {
            dashboardUuid: dashboardData.uuid,
            componentUuid: component.uuid
        };
    });
};

const getFilters = (widgetData, targetGroups) => {
    let appliedFilterType = null;
    let appliedFilters = null;

    for (let i = widgetData.length; i--;) {
        const widget = widgetData[i];

        if (widget.focusFilter) {
            if (widget.focusFilter.hostAddress) {
                delete widget.focusFilter.targetList;
                appliedFilterType = 'Custom';
            } else {
                delete widget.focusFilter.hostAddress;
                appliedFilterType = 'Target Group';
            }

            const getFilterValue = () => {
                const appliedFilterKey = Object.keys(widget.focusFilter)[0];
                const appliedFilterValue = widget.focusFilter[appliedFilterKey];
                const appliedFilterReadableValues = [];

                switch (appliedFilterKey) {
                    case 'targetList':
                        for (let j = targetGroups.length; j--;) {
                            const targetGroup = targetGroups[j];

                            for (let k = appliedFilterValue.length; k--;) {
                                const appliedTargetGroup = appliedFilterValue[k];

                                if (appliedTargetGroup === targetGroup.id.toString()) {
                                    appliedFilterReadableValues.push(targetGroup.name);
                                }
                            }
                        }

                        return appliedFilterReadableValues.sort().join(', ');
                    case 'hostAddress':
                        return appliedFilterValue.replace(/,/g, ', ');
                }
            };

            appliedFilters = [{
                name: getFilterValue(),
                type: appliedFilterType
            }];
        }
    }

    return appliedFilters;
};

const getTileLayoutProp = (visualizationData, targetGroups) => {
    const tileLayout = visualizationData.map((tile) => {
        let filtersApplied = null;

        if (tile.focusFilter) {
            filtersApplied = getFilters(visualizationData, targetGroups);
        }

        const tileLayoutProp = {
            title: tile.name,
            custom: {
                uuid: tile.uuid,
                filters: filtersApplied
            },
            i: tile.position.toString()
        };

        // TODO: remove this conditional when backend migration has been complete on all environments
        if (tile.layout) {
            tileLayoutProp.x = tile.layout.x;
            tileLayoutProp.y = tile.layout.y;
            tileLayoutProp.w = tile.layout.w;
            tileLayoutProp.h = tile.layout.h;

            return tileLayoutProp;
        }

        // Determine tiles information for dashboards that don't have this information yet
        // TODO: remove this and TILE_DEFAULTS when backend migration has been complete on all environments
        const tileColumns = TILE_DEFAULTS.TILE_COLUMNS;
        const isEvenNumberedTile = tile.position % tileColumns;
        const rowNumber = Math.floor(tile.position / tileColumns) * TILE_DEFAULTS.ROWS_PER_TILE;

        tileLayoutProp.x = isEvenNumberedTile ? TILE_DEFAULTS.TOTAL_COLUMNS / tileColumns : 0;
        tileLayoutProp.y = rowNumber;
        tileLayoutProp.w = TILE_DEFAULTS.WIDTH;
        tileLayoutProp.h = TILE_DEFAULTS.HEIGHT;

        return tileLayoutProp;
    });

    return sortBy(tileLayout, [(tile) => { return Number(tile.i); }]);
};

const getTileComponentsProp = (visualizationData, fetchingVisualizationData) => {
    const visualizationFeed = visualizationData.map((visualization, key) => {
        switch (visualization.widget) {
            case VISUALIZATION_WIDGETS.PIE_CHART:
                return (<PieChartComponent visualization={visualization} key={key} />);
            case VISUALIZATION_WIDGETS.BAR_CHART:
                return (<BarChartComponent visualization={visualization} key={key} />);
            case VISUALIZATION_WIDGETS.TABLE:
                return (
                    <TableComponent
                        visualization={visualization}
                        key={key}
                        fetchingVisualizationData={fetchingVisualizationData} />
                );
            case VISUALIZATION_WIDGETS.MATRIX:
                return (<MatrixComponent visualization={visualization} key={key} />);
            case VISUALIZATION_WIDGETS.VERTICAL_BAR_CHART:
                return (<VerticalBarChartComponent visualization={visualization} key={key} />);
            case VISUALIZATION_WIDGETS.MATRIX_PIE_CHART:
                return (<MatrixPieChartComponent visualization={visualization} key={key} />);
            case VISUALIZATION_WIDGETS.STATS_MATRIX:
                return (<StatsMatrixComponent visualization={visualization} key={key} />);
            default:
                return (<React.Fragment visualization={visualization} key={key}>Not Yet Implemented</React.Fragment>);
        }
    });

    return sortBy(visualizationFeed, [function (widget) { return widget.props.visualization.position; }]);
};

const mapSeverity = (commaList) => {
    const vals = SEVERITY_LEVELS;
    const list = commaList.split(',');
    let newCommaList = '';

    for (let i = 0; i < list.length; i++) {
        newCommaList = `${newCommaList},${vals[parseInt(list[i], 10)]}`;
    }

    return newCommaList.substring(1);
};

const getDateFromNow = (val) => {
    if (val.includes('all')) {
        return '';
    }

    const d = new Date();
    // we want two places for MM and DD
    const digit = 2;

    // Calculate days before or after today
    d.setDate(d.getDate() + parseInt(val, 10));

    // Setting YYYY/MM/DD values
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(digit, 0);
    const date = d.getDate().toString().padStart(digit, 0);

    return `${year}/${month}/${date}`;
};

const createDateFilters = (name, values) => {
    const valueList = values.split(':');
    const list = [
        {
            name,
            typeCheck: 'date-lt',
            values: getDateFromNow(`-${valueList[0]}`)
        },
        {
            name,
            typeCheck: 'date-gt',
            values: getDateFromNow(`-${valueList[1]}`)
        }
    ];

    if (valueList[0] === 'all') {
        list.unshift();
    } else if (valueList[1] === 'all') {
        list.pop();
    }

    return list;
};

const mapOperator = (op) => {
    const map = {
        '=': 'eq',
        '!=': 'neq',
        '~=': 'match'
    };

    return map[op] || op;
};

const mapExploitFrameworks = (values) => {
    const map = {
        'malware': 'plugin.attributes.exploited_by_malware',
        'canvas': 'plugin.attributes.exploit_framework_canvas'
    };

    return map[values] || values;
};

const doMapping = ({ filterName, operator, value }) => {
    let name = filterName;
    const typeCheck = mapOperator(operator);
    let values = value;

    switch (name) {
        case 'cvssTemporalVector':
            name = 'plugin.attributes.cvss_temporal_vector.raw';
            break;
        case 'cvssVector':
            name = 'plugin.attributes.cvss_vector.raw';
            break;
        case 'exploitFrameworks':
            name = mapExploitFrameworks(values);
            values = true;
            break;
        case 'familyID':
            name = 'plugin.family_id';
            break;
        case 'firstSeen':
            name = 'tracking.first_found';

            return createDateFilters(name, values);
        case 'patchPublished':
            name = 'plugin.attributes.patch_publication_date';

            return createDateFilters(name, values);
        case 'port':
            name = 'port.port';
            break;
        case 'severity':
            values = mapSeverity(values);
            break;
        case 'vulnPublished':
            name = 'plugin.attributes.vuln_publication_date';

            return createDateFilters(name, values);
        case 'vulnStateTag':
            return;
    }

    return {
        name,
        typeCheck,
        values
    };
};

const mapFilters = (filters) => {
    let list = [];

    for (let i = 0; i < filters.length; i++) {
        const newFilters = doMapping(filters[i]);

        if (newFilters) {
            if (Array.isArray(newFilters)) {
                list = list.concat(newFilters);
            } else {
                list.push(newFilters);
            }
        }
    }

    return list;
};

const addFilter = (name, values, operator) => {
    return [{
        name,
        typeCheck: operator || NEW_FILTER_OPERATORS.EQUAL,
        values
    }];
};

const removeSeverity = (filters) => {
    return filters.filter((item) => {
        return item.name !== VULN_API_FILTERS.SEVERITY;
    });
};

export {
    getUuids,
    getTileLayoutProp,
    getTileComponentsProp,
    mapFilters,
    addFilter,
    removeSeverity
};
