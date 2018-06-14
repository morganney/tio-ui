const BRANCH_NAME = 'containerSecurity';
const STEM_NAME = 'dashboard';
const NAVIGATION_LINKS_STATISTICS = [
    {
        readableText: 'Policies',
        url: '/container-security/policies'
    },
    {
        readableText: 'Images',
        url: '/container-security/images'
    },
    {
        readableText: 'Repositories',
        url: '/container-security/repositories'
    }
];

const NAVIGATION_LINK_CONNECTOR = [
    {
        readableText: 'Import',
        url: '/container-security/import'
    }
];

const ORGANIZATION_STATS_BASE_API = '/container-security/api/v2/organization-stats';

export {
    BRANCH_NAME,
    STEM_NAME,
    ORGANIZATION_STATS_BASE_API,
    NAVIGATION_LINKS_STATISTICS,
    NAVIGATION_LINK_CONNECTOR
};
