import path from 'path';

import locales from '../deps/alloy/i18n/locales';

const root = path.join(__dirname, '..');
const build = {
    root,
    lintable: [
        'folgers/**/*.js',
        'jest/**/*.js',
        'gulpfile.babel.js/**/*.js',
        'webpack.config.babel.js',
        'webpack.config.babel.prod.js'
    ],
    dest: path.join(root, 'dist', 'public'),
    assets: path.join(root, 'dist', 'public', '*')
};
const deps = {
    alloy: {
        name: 'alloy',
        root: path.join(root, 'deps', 'alloy'),
        build: path.join('deps', 'alloy', 'webpack.config.babel.js'),
        src: path.join('deps', 'alloy', 'src', '**', '*.js'),
        dest: path.join('deps', 'alloy', 'dist'),
        js: path.join('deps', 'alloy', 'src', '**', '*.js'),
        i18n: {
            locales,
            localeDataDest: path.join('deps', 'alloy', 'i18n', 'locale-data')
        }
    },
    common: {
        name: 'tio-common',
        root: path.join(root, 'deps', 'common'),
        build: path.join('deps', 'common', 'webpack.config.babel.js'),
        src: path.join('deps', 'common', 'src', '**', '*.js'),
        dest: path.join('deps', 'common', 'dist'),
        js: path.join('deps', 'common', 'src', '**', '*.js')
    }
};
const apps = {
    login: {
        root: path.join(root, 'apps', 'login'),
        name: 'login',
        js: path.join('apps', 'login', 'src', '**', '*.js')
    },
    tenableio: {
        root: path.join(root, 'apps', 'tenableio'),
        name: 'tenableio',
        js: path.join('apps', 'tenableio', 'src', '**', '*.js')
    },
    dashboards: {
        root: path.join(root, 'apps', 'dashboards'),
        name: 'dashboards',
        js: path.join('apps', 'dashboards', 'src', '**', '*.js')
    },
    containerSecurity: {
        root: path.join(root, 'apps', 'container-security'),
        name: 'containerSecurity',
        js: path.join('apps', 'container-security', 'src', '**', '*.js')
    },
    vulnerabilityManagement: {
        root: path.join(root, 'apps', 'vulnerability-management'),
        name: 'vulnerabilityManagement',
        js: path.join('apps', 'vulnerability-management', 'src', '**', '*.js')
    },
    settings: {
        root: path.join(root, 'apps', 'settings'),
        name: 'settings',
        js: path.join('apps', 'settings', 'src', '**', '*.js')
    },
    lumin: {
        root: path.join(root, 'apps', 'lumin'),
        name: 'lumin',
        js: path.join('apps', 'lumin', 'src', '**', '*.js')
    }
};
const config = { build, deps, apps };

export { build, deps, apps };
export default config;
