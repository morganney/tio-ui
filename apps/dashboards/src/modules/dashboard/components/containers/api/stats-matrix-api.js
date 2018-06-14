import { Utils } from 'tio-alloy';

import { getRatioCellLabel } from './matrix-api';

import { COLOR_MAP } from '../../../constants';

const getHeadingsProp = (visualization) => {
    const headings = [];

    for (let i = 0; i < visualization.data.xLabels.length; i++) {
        const heading = visualization.data.xLabels[i].split(':')[0].trim();

        if (headings.indexOf(heading) < 0) {
            headings.push(heading);
        }
    }

    return headings;
};

const getDataProp = (visualization) => {
    return visualization.data.cells.map((cell) => {
        const { value, abbreviation } = Utils.truncateNumber(cell.value);
        let displayValue = value;

        if (cell.cellType === 'textRatio') {
            displayValue = getRatioCellLabel(displayValue);
        }

        return {
            value: displayValue,
            abbreviation,
            color: COLOR_MAP.fgColor[cell.fgColor]
        };
    });
};

const getLabelsProp = (visualization) => {
    const labels = [];

    for (let i = 0; i < visualization.data.xLabels.length; i++) {
        const label = visualization.data.xLabels[i].split(':');

        if (label.length > 1) {
            labels.push(label[1].trim());
        }
    }

    return labels;
};

const getDefinitionsProp = (visualization) => {
    return visualization.definition.cells.map((cell) => { return cell.dataSource.query; });
};

export {
    getHeadingsProp,
    getDataProp,
    getLabelsProp,
    getDefinitionsProp
};
