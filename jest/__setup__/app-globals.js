import apps from '../../folgers/config/apps';

const appKeys = Object.keys(apps);
const configuredApps = {};

appKeys.forEach((key) => {
    configuredApps[apps[key].id] = apps[key];
});

window.CONFIGURED_APPS = configuredApps;
