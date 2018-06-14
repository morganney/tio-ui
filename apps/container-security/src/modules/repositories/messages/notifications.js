import { defineMessages } from 'react-intl';

const notificationMessages = defineMessages({
    deleteRepositoryRequest: {
        id: 'CONSEC_DELETE_REPOSITORY_REQUEST',
        description: 'Question in the notification, when you attempt to delete a repository.',
        defaultMessage: 'Are you sure you wish to delete this Repository?'
    },
    deleteRepositorySuccess: {
        id: 'CONSEC_DELETE_REPOSITORY_SUCCESS',
        description: 'Success message for deleting a repository.',
        defaultMessage: 'Successfully deleted the repository.'
    },
    deleteRepositoryFailure: {
        id: 'CONSEC_DELETE_REPOSITORY_FAILURE',
        description: 'Failure message for deleting a repository.',
        defaultMessage: 'Failed to delete the repository.'
    }
});

export {
    notificationMessages
};
