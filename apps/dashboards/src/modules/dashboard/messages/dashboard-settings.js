import { defineMessages } from 'react-intl';

const dashboardSettingsMessages = defineMessages({
    actionSetAsDefault: {
        id: 'DASHBOARD_SETTINGS_ACTION_SET_AS_DEFAULT',
        description: 'Tooltip text for set as default action button',
        defaultMessage: 'Set as Default'
    },
    actionFilter: {
        id: 'DASHBOARD_SETTINGS_ACTION_FILTER',
        description: 'Tooltip text for filter action button',
        defaultMessage: 'Filter'
    },
    actionDuplicate: {
        id: 'DASHBOARD_SETTINGS_ACTION_DUPLICATE',
        description: 'Tooltip text for duplicate action button',
        defaultMessage: 'Duplicate'
    },
    widgetsHeading: {
        id: 'DASHBOARD_SETTINGS_WIDGETS_HEADER',
        description: 'Heading text for widgets section in dashboard settings',
        defaultMessage: 'WIDGETS'
    }
});

export {
    dashboardSettingsMessages
};
