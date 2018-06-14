import { defineMessages } from 'react-intl';

const notificationsMessages = defineMessages({
    notificationConnectorSuccess: {
        id: 'CONSEC_CONNECTOR_SUCCESS_IMPORT',
        description: 'Description for the successful connector import.',
        defaultMessage: 'Successfully imported the connector.'
    },
    notificationConnectorFail: {
        id: 'CONSEC_CONNECTOR_FAIL_IMPORT',
        description: 'Description for the failed connector import.',
        defaultMessage: 'Failed to import the connector.'
    },
    notificationConnectorTestFail: {
        id: 'CONSEC_CONNECTOR_FAIL_TEST',
        description: 'Description for the failed connector import test.',
        defaultMessage: 'Failed to test the connector.'
    },
    notificationConnectorRunFail: {
        id: 'CONSEC_CONNECTOR_FAIL_RUN',
        description: 'Description for the failed connector import run.',
        defaultMessage: 'Failed to run the connector.'
    }
});

export {
    notificationsMessages
};
