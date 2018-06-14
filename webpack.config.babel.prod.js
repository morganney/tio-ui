import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import tioApps from './folgers/config/apps';

export default (settings) => {
    const tioAppKeys = Object.keys(tioApps);
    const env = {
        apps: tioAppKeys,
        default: 'dashboards',
        deployVersion: new Date().getTime(),
        ...settings
    };
    const entries = {
        'vendor': '@babel/polyfill'
    };
    const include = [];
    const appConfig = {};
    const chunks = [];
    const mapChunkToApp = {};
    const logLevelDefaults = {
        dev: 0,
        prod: 3
    };
    const apiPrefixDefaults = {
        dev: '/api/',
        prod: ''
    };
    let API_PREFIX = apiPrefixDefaults.dev;
    let LOG_LEVEL = logLevelDefaults.dev;
    const RUN_MOCK = false;

    if (process.env.NODE_ENV === 'production') {
        API_PREFIX = apiPrefixDefaults.prod;
        LOG_LEVEL = logLevelDefaults.prod;
    }

    tioAppKeys.forEach((app) => {
        if (tioApps[app].root && app !== 'login') {
            include.push(path.resolve(__dirname, `apps/${app}/src`));
        }
    });

    env.apps.forEach((app) => {
        if (app !== 'login' && tioApps[app]) {
            const appId = tioApps[app].id;

            appConfig[appId] = tioApps[app];

            if (tioApps[app].root) {
                chunks.push(app);
                entries[app] = tioApps[app].root;
                mapChunkToApp[app] = appId;
            }

            if (app === env.default) {
                appConfig.default = app;
            }
        }
    });

    // If the default app wasn't included in the list of apps, then set it to the first app in the list
    if (!appConfig.default && env.apps.length) {
        appConfig.default = env.apps[0];
    }

    return {
        context: __dirname,
        entry: { ...entries },
        output: {
            path: path.resolve(__dirname, 'dist/public'),
            filename: '[name].js',
            publicPath: '/tio'
        },
        resolve: {
            alias: {
                'tio-container-security': path.resolve(__dirname, 'apps/container-security/src'),
                'tio-dashboards': path.resolve(__dirname, 'apps/dashboards/src'),
                'tio-settings': path.resolve(__dirname, 'apps/settings/src'),
                'tio-vm': path.resolve(__dirname, 'apps/vulnerability-management/src'),
                'tio-lumin': path.resolve(__dirname, 'apps/lumin/src'),
                'tio-app': path.resolve(__dirname, 'apps/tenableio/src')
            },
            extensions: ['.js']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-react',
                                    ['@babel/preset-env', {
                                        targets: {
                                            browsers: ['last 2 versions']
                                        },
                                        useBuiltIns: 'entry'
                                    }]
                                ],
                                plugins: [
                                    require('@babel/plugin-proposal-class-properties'),
                                    require('@babel/plugin-proposal-object-rest-spread')
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpg|tif)$/,
                    include,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                // ~ 8kb
                                limit: 8192
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    include,
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|woff|woff2|png|gif)$/,
                    include,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    include,
                    use: [
                        {
                            loader: 'svg-url-loader'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                'process.env.BABEL_ENV': JSON.stringify('production'),
                CONFIGURED_APPS: JSON.stringify(appConfig),
                API_PREFIX: JSON.stringify(API_PREFIX),
                LOG_LEVEL: JSON.stringify(LOG_LEVEL),
                RUN_MOCK: JSON.stringify(RUN_MOCK)
            }),
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false
                }
            }),
            new HtmlWebpackPlugin({
                title: 'Tenable.io',
                filename: 'app.html',
                template: path.resolve(__dirname, 'template.html'),
                inject: false,
                chunksSortMode: 'manual',
                chunks: (['vendor', 'common']).concat(chunks),
                config: {
                    deployVersion: env.deployVersion,
                    mapChunkToApp
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                chunks,
                minChunks: (module) => {
                    return /node_modules/.test(module.context);
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                chunks,
                minChunks: chunks.length
            })
        ]
    };
};
