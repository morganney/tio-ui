import sumBy from 'lodash/sumBy';

import { SEVERITY_PALETTE, CHART_PALETTE } from '../../../constants';

const getDataProp = (visualization) => {
    let palette = CHART_PALETTE;
    let reverseOrder = false;

    if (visualization.palette && visualization.palette === 'severity') {
        palette = SEVERITY_PALETTE;
        reverseOrder = true;
    }

    const mappedData = visualization.data.values.map((item, index) => {
        return {
            x: index,
            y: item.value,
            name: String(item.label),
            color: palette[index % palette.length]
        };
    });

    if (reverseOrder) {
        mappedData.reverse();
    }

    return mappedData;
};

const getLegendItemsProp = (mappedData) => {
    const legendItems = [];
    let total = 0;

    for (let i = 0; i < mappedData.length; i++) {
        total += mappedData[i].y;
    }

    for (let i = 0; i < mappedData.length; i++) {
        const dataItem = mappedData[i];
        const percentMultiplier = 100;
        let percent = Math.round((dataItem.y / total) * percentMultiplier);

        if (percent === 0 && dataItem.y > 0) {
            percent = '<1';
        }

        legendItems.push(
            {
                value: `${percent}%`,
                description: dataItem.name,
                color: dataItem.color
            }
        );
    }

    return legendItems;
};

const getDescriptionHeader = (visualization) => {
    let header = null;

    switch (visualization.definition.dataSource.query.tool) {
        case 'sumseverity':
        case 'sumid':
            header = String(sumBy(visualization.data.values, function (item) { return item.value; }));
            break;
    }

    return header;
};

const getDescriptionDetail = (visualization) => {
    let detail = null;

    switch (visualization.definition.dataSource.query.tool) {
        case 'sumseverity':
        case 'sumid':
            detail = 'Vulnerabilities';
            break;
        case 'sumport':
            detail = 'Ports';
            break;
        case 'sumcve':
            detail = 'CVES';
            break;
        case 'listos':
            detail = 'OS';
            break;
    }

    return detail;
};

export {
    getDataProp,
    getLegendItemsProp,
    getDescriptionHeader,
    getDescriptionDetail
};
