import { defineMessages } from 'react-intl';

const buttonMessages = defineMessages({
    buttonSignOut: {
        id: 'SIGN_OUT',
        description: 'Text for the button to log a user out',
        defaultMessage: 'Sign Out'
    },
    buttonCancel: {
        id: 'CANCEL',
        description: 'Text for a generic cancel button',
        defaultMessage: 'Cancel'
    },
    buttonDelete: {
        id: 'DELETE',
        description: 'Text for a generic delete button',
        defaultMessage: 'Delete'
    },
    buttonAdd: {
        id: 'ADD',
        description: 'Text for a generic add button',
        defaultMessage: 'Add'
    },
    buttonImport: {
        id: 'IMPORT',
        description: 'Text for a generic import button',
        defaultMessage: 'Import'
    }
});

export { buttonMessages };
