import { colors } from '@hivekit/core';

import { myDashboards } from './messages';

const BRANCH_NAME = 'dashboards';
const STEM_NAME = 'dashboard';

const VISUALIZATION_WIDGETS = {
    PIE_CHART: 'pie',
    BAR_CHART: 'bar',
    TABLE: 'table',
    MATRIX: 'matrix',
    VERTICAL_BAR_CHART: 'matrixBar',
    MATRIX_PIE_CHART: 'matrixPie',
    STATS_MATRIX: 'matrixGroup3'
};

const TILE_DEFAULTS = {
    WIDTH: 6,
    HEIGHT: 5,
    ROWS_PER_TILE: 5,
    TILE_COLUMNS: 2,
    TOTAL_COLUMNS: 12
};

const SEVERITY_LEVELS = ['Info', 'Low', 'Medium', 'High', 'Critical'];

const SEVERITY_PALETTE = [
    colors.actionBlueDark,
    colors.statusGreen,
    colors.statusYellow,
    colors.statusOrange,
    colors.statusRed
];

const SEVERITY_GRADIENT_PALETTE = [
    '#D2403F',
    '#CC3C22',
    '#D55627',
    '#DE6D2D',
    '#E68733',
    '#EF9F39'
];

const CHART_PALETTE = [
    colors.chartBlue,
    colors.chartBlueLight,
    colors.chartGreen,
    colors.chartGreenLight,
    colors.chartGreenLighter,
    colors.chartYellowGreen,
    colors.chartGold
];

const COLOR_MAP = {
    'fgColor': {
        '26,26,64': colors.matrixItemText,
        '51,51,51': colors.matrixItemText,
        '255,255,255': colors.matrixItemText,
        '237,243,253': colors.matrixItemText,
        '38,55,70': colors.matrixItemText,
        '171,32,216': colors.statusPurple,
        '59,76,161': colors.statusPurple,
        '198,16,16': colors.statusRed,
        '212,63,58': colors.statusRed,
        '211,159,39': colors.statusOrange,
        '238,147,54': colors.statusOrange,
        '213,201,32': colors.statusYellow,
        '253,196,49': colors.statusYellow,
        '121,171,61': colors.statusGreen,
        '76,174,76': colors.statusGreen
    },
    'bgColor': {
        '255,255,255': colors.white,
        '237,243,253': colors.white,
        '51,51,51': colors.matrixItemText,
        '38,55,70': colors.matrixItemText,
        '171,32,216': colors.statusPurple,
        '59,76,161': colors.statusPurple,
        '212,63,58': colors.statusRed,
        '198,16,16': colors.statusRed,
        '211,159,39': colors.statusOrange,
        '238,147,54': colors.statusOrange,
        '213,201,32': colors.statusYellow,
        '253,196,49': colors.statusYellow,
        '121,171,61': colors.statusGreen,
        '76,174,76': colors.statusGreen
    }
};

const DEFAULT_UUID = 'f990c5a3-63a0-45f8-bca7-2d6c932b70d8';

const NOTIFICATION_TYPE_MAP = {
    success: 'low',
    error: 'critical'
};

const PLANE = {
    MY_DASHBOARDS: 'my-dashboards',
    DASHBOARD_SETTINGS: 'dashboard-settings',
    DASHBOARD_TEMPLATE_PREVIEW: 'dashboard-template-preview',
    WIDGET_SETTINGS: 'widget-settings'
};

const PLANE_VIEW = {
    PARTIAL: 'partial',
    FULL: 'full',
    CLOSED: 'closed'
};

const REDUX_FORM_FILTER_DASHBOARD = `${BRANCH_NAME}.${STEM_NAME}.filterDashboardForm`;
const REDUX_FORM_FILTER_WIDGET = `${BRANCH_NAME}.${STEM_NAME}.filterWidgetForm`;

const DASHBOARD_ROUTE_PATH = '/dashboards/';
const DASHBOARD_DRILL_DOWN_PATH = {
    VULNERABILITIES_PLUGINS: '/vulnerabilities/plugins',
    VULNERABILITIES_ASSETS: '/vulnerabilities/assets',
    PLUGIN_DETAIL: '/detail',
    ASSET_DETAIL: '/detail/vulnerabilities'
};
const DASHBOARD_DRILL_DOWN_SEARCH_TYPE = {
    AND: 'and'
};
const TOOL_TYPE = {
    HOST_COUNT: 'hostcount',
    VULN_COUNT: 'vulncount',
    SUM_CVE: 'sumcve',
    SUM_FAMILY: 'sumfamily',
    SUM_ID: 'sumid',
    SUM_IP: 'sumip',
    SUM_PORT: 'sumport',
    SUM_SEVERITY: 'sumseverity'
};

const VULN_API_FILTERS = {
    PORT: 'port.port',
    CVE_ID: 'plugin.attributes.cve.raw',
    SEVERITY: 'severity',
    FAMILY_ID: 'plugin.family_id'
};

const NEW_FILTER_OPERATORS = {
    EQUAL: 'eq',
    MATCH: 'match'
};

const PRODUCT_DEFAULT_DASHBOARDS = [
    {
        URL: CONFIGURED_APPS.lumin.home,
        FEATURE_FLAG: CONFIGURED_APPS.lumin.featureFlag,
        TITLE: myDashboards.luminDashboardTitle
    },
    {
        URL: CONFIGURED_APPS.vulnerabilityManagement.home,
        FEATURE_FLAG: CONFIGURED_APPS.vulnerabilityManagement.featureFlag,
        TITLE: myDashboards.vulnerabilityManagementDashboardTitle
    },
    {
        URL: CONFIGURED_APPS.containerSecurity.home,
        FEATURE_FLAG: CONFIGURED_APPS.containerSecurity.featureFlag,
        TITLE: myDashboards.containerSecurityDashboardTitle
    },
    {
        URL: CONFIGURED_APPS.webAppScanning.home,
        FEATURE_FLAG: CONFIGURED_APPS.webAppScanning.featureFlag,
        TITLE: myDashboards.webappScanningDashboardTitle
    }
];

export {
    BRANCH_NAME,
    STEM_NAME,
    VISUALIZATION_WIDGETS,
    TILE_DEFAULTS,
    SEVERITY_LEVELS,
    SEVERITY_PALETTE,
    SEVERITY_GRADIENT_PALETTE,
    CHART_PALETTE,
    COLOR_MAP,
    DEFAULT_UUID,
    NOTIFICATION_TYPE_MAP,
    PLANE,
    PLANE_VIEW,
    REDUX_FORM_FILTER_DASHBOARD,
    DASHBOARD_ROUTE_PATH,
    REDUX_FORM_FILTER_WIDGET,
    DASHBOARD_DRILL_DOWN_PATH,
    DASHBOARD_DRILL_DOWN_SEARCH_TYPE,
    TOOL_TYPE,
    VULN_API_FILTERS,
    NEW_FILTER_OPERATORS,
    PRODUCT_DEFAULT_DASHBOARDS
};
