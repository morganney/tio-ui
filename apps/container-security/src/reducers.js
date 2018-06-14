import * as dashboard from './modules/dashboard';
import * as policies from './modules/policies';
import * as images from './modules/images';
import * as repositories from './modules/repositories';
import * as connectors from './modules/connectors';

const reducers = [
    {
        branch: 'containerSecurity',
        stems: [
            {
                name: dashboard.constants.STEM_NAME,
                reducer: dashboard.reducer
            },
            {
                name: policies.constants.STEM_NAME,
                reducer: policies.reducer
            },
            {
                name: images.constants.STEM_NAME,
                reducer: images.reducer
            },
            {
                name: repositories.constants.STEM_NAME,
                reducer: repositories.reducer
            },
            {
                name: connectors.constants.STEM_NAME,
                reducer: connectors.reducer
            }
        ]
    }
];

export {
    reducers
};
