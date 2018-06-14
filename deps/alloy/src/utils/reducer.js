import { combineReducers } from 'redux';

const processReducerTrees = (reducerConfigs) => {
    let reducers = {};

    reducerConfigs.forEach((config) => {
        if (config.stems) {
            const stems = {};

            config.stems.forEach((stem) => {
                stems[stem.name] = combineReducers(stem.reducer);
            });

            // Stems must be associated with a parent branch
            reducers[config.branch] = combineReducers(stems);
        } else if (config.branch) {
            // Branch with no stems
            reducers[config.branch] = combineReducers(config.reducer);
        } else {
            reducers = { ...reducers, ...config.reducer };
        }
    });

    return reducers;
};

export {
    processReducerTrees
};
