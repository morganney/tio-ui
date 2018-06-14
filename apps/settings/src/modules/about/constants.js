const BRANCH_NAME = 'settings';
const STEM_NAME = 'about';
const CREDENTIALS = 'credentials';
const CONNECTORS = 'connectors';
const NAVIGATION_LINKS = [
    {
        label: 'Credentials',
        moduleName: CREDENTIALS,
        link: '/settings/credentials'
    },
    {
        label: 'Connectors',
        moduleName: CONNECTORS,
        link: '/settings/connectors'
    }
];

export {
    BRANCH_NAME,
    STEM_NAME,
    NAVIGATION_LINKS,
    CREDENTIALS,
    CONNECTORS
};
