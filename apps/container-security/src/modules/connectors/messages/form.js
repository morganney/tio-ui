import { defineMessages } from 'react-intl';

const formMessages = defineMessages({
    formPassword: {
        id: 'CONSEC_CONNECTOR_FORM_PASSWORD',
        description: 'Password for connector form',
        defaultMessage: 'PASSWORD'
    },
    formUsername: {
        id: 'CONSEC_CONNECTOR_FORM_USERNAME',
        description: 'Username for connector form',
        defaultMessage: 'USER NAME'
    },
    formPort: {
        id: 'CONSEC_CONNECTOR_FORM_PORT',
        description: 'Port name for connector form',
        defaultMessage: 'PORT'
    },
    formUrl: {
        id: 'CONSEC_CONNECTOR_FORM_URL',
        description: 'Url name for connector form',
        defaultMessage: 'URL'
    }
});

export {
    formMessages
};
