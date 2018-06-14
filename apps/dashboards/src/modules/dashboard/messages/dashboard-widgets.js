import { defineMessages } from 'react-intl';

const dashboardWidgetMessages = defineMessages({
    deleteDashboardWidgetHeading: {
        id: 'DASHBOARD_WIDGET_DELETE_HEADING',
        description: 'Heading for the notification, when you attempt to delete a dashboard widget.',
        defaultMessage: 'Confirm Deletion'
    },
    deleteDashboardWidgetConfirmation: {
        id: 'DASHBOARD_WIDGET_DELETE_CONFIRMATION',
        description: 'Question in the notification, when you attempt to delete a dashboard widget.',
        defaultMessage: 'Are you sure you wish to delete this Widget?'
    }
});

export {
    dashboardWidgetMessages
};
