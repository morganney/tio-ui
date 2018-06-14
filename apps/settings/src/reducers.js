import * as credentials from './modules/credentials';
import * as credentialForm from './modules/credential-form';
import * as connectors from './modules/connectors';

const reducers = [
    {
        branch: 'settings',
        stems: [
            {
                name: credentials.constants.STEM_NAME,
                reducer: credentials.reducers
            },
            {
                name: credentialForm.constants.STEM_NAME,
                reducer: credentialForm.reducers
            },
            {
                name: connectors.constants.STEM_NAME,
                reducer: connectors.reducers
            }
        ]
    }
];

export {
    reducers
};
