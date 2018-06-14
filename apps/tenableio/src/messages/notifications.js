import { defineMessages } from 'react-intl';

const notificationMessages = defineMessages({
    confirmDeletionTitle: {
        id: 'CONFIRM_DELETION_TITLE',
        description: 'Title text for a notification, asking the user to confirm a deletion',
        defaultMessage: 'Confirm Deletion'
    },
    genericApiError: {
        id: 'GENERIC_API_ERROR',
        description: 'Notification text for a generic API error.',
        defaultMessage: 'There was an error in processing your request.'
    }
});

export { notificationMessages };
