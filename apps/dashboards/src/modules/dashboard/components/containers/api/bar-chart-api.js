const getDataProp = (visualization) => {
    return visualization.data.data[0].data;
};

const getTicksProp = (visualization) => {
    return visualization.data.labels;
};

const getChartLegendProp = () => {
    return ['Asset Count'];
};

export {
    getDataProp,
    getTicksProp,
    getChartLegendProp
};
