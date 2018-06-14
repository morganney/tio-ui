import path from 'path';
import fs from 'fs';

import gulp from 'gulp';
import log from 'fancy-log';
import PluginError from 'plugin-error';
import webpack from 'webpack';
import proxy from 'http-proxy-middleware';
import WebpackDevServer from 'webpack-dev-server';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import historyApiFallback from 'connect-history-api-fallback';
import { argv } from 'yargs';

import getWebpackConfig from '../../webpack.config.babel';
import { deps } from '../config';

const {
    Compiler,
    NodeEnvironmentPlugin,
    WebpackOptionsDefaulter,
    WebpackOptionsApply
} = webpack;
/**
 * Setup webpack compiler options.
 * @see https://webpack.js.org/api/compiler/
 * @see https://github.com/webpack/webpack/blob/dee0774f7b3cad1afcd8204a8affd51096f204b6/lib/webpack.js#L26-L37
 * @param {Object} compiler webpack compiler
 * @param {Object} config   webpack config
 */
const setCompilerOptions = (compiler, config) => {
    compiler.context = config.context;
    new WebpackOptionsDefaulter().process(config);
    new NodeEnvironmentPlugin().apply(compiler);
    compiler.options = new WebpackOptionsApply().process(config, compiler);

    if (Array.isArray(config.plugins)) {
        compiler.apply(...config.plugins);
    }
};
const setCompilerListeners = (compiler) => {
    compiler.plugin('done', (stats) => {
        log(stats.toString(compilations ? 'minimal' : {
            colors: true
        }));
        compilations++;

        // If the stats flag is turned on, output the stats to a file
        if (argv.stats) {
            fs.writeFileSync('stats.json', JSON.stringify(stats.toJson('normal')));
        }
    });
};
let compilations = 0;

function webpackDevServerTask (callback) {
    const { browser, open: openBrowser, docker, port: cliPort } = argv;
    const browserList = {
        chrome: 'google chrome',
        firefox: 'firefox',
        safari: 'safari'
    };
    const port = 3335;
    const host = 'localhost';
    const contentBase = path.join(deps.alloy.root, 'dist');
    const options = { stats: false, port, host, contentBase };
    const target = 'https://qa-develop.cloud.aws.tenablesecurity.com';
    const webpackConfig = getWebpackConfig(argv);
    let webuiDomain = host;
    let webuiPort = 3000;
    let config = {};
    const determineConfigPort = () => {
        let uiPort = 3333;

        if (cliPort) {
            uiPort = cliPort;
        }

        return uiPort;
    };
    const determineConfigOpen = () => {
        let openConfig = 'local';

        // Cannot use !openBrowser, because the lack of the flag will have openBrowser set to undefined
        if (openBrowser === false || docker) {
            openConfig = false;
        }

        return openConfig;
    };
    const determineConfigBrowser = () => {
        let browserToUse = browserList.chrome;

        if (browser && browserList[browser]) {
            browserToUse = browserList[browser];
        }

        return browserToUse;
    };

    if (argv['webui-domain']) {
        webuiDomain = argv['webui-domain'];
    }

    if (argv['webui-port']) {
        webuiPort = argv['webui-port'];
    }

    config = {
        ...webpackConfig,
        devtool: 'inline-source-map',
        plugins: [
            ...webpackConfig.plugins,
            new BrowserSyncPlugin({
                host,
                ui: {
                    port: 3334
                },
                port: determineConfigPort(),
                open: determineConfigOpen(),
                browser: determineConfigBrowser(),
                proxy: {
                    target: `${host}:${port}`,
                    middleware: [
                        (req, res, next) => {
                            // Allow caching of font files
                            if (req.url.match(/\.(ttf|eot|woff|woff2)$/)) {
                                res.setHeader('Cache-Control', 'max-age=86400');
                            }
                            next();
                        },
                        proxy((pathname) => {
                            const paths = [
                                /^\/tio/i,
                                /^\/api/i,
                                /^\/mock/i,
                                /^\/browser-sync/i,
                                /^\/favicon.ico$/i,
                                /^\/$/i,
                                /^\/login\.[a-z]+$/i,
                                /^\/password-reset/i,
                                /^\/i18n/i,
                                /^\/fonts/i
                            ];

                            for (let i = paths.length; i--;) {
                                if (pathname.match(paths[i])) {
                                    return false;
                                }
                            }

                            return true;
                        }, {
                            target: `http://${webuiDomain}:${webuiPort}`,
                            changeOrigin: true,
                            logLevel: 'silent'
                        }),
                        proxy('/api', {
                            target: argv.target ? argv.target : target,
                            changeOrigin: true,
                            pathRewrite: { '^/api': '' }
                        }),
                        historyApiFallback()
                    ]
                }
            }, {
                reload: false,
                callback
            })
        ]
    };
    const compiler = new Compiler();

    // Docs say addDevServerEntrypoints() is necessary for HMR, however the
    // devServer wont reload on changes without calling it via the Node.js API.
    // @see https://webpack.js.org/guides/hot-module-replacement/#via-the-node-js-api
    // @see https://github.com/webpack/webpack-dev-server/issues/106
    // NOTE: This causes the export of those entry points to not be transpiled
    // e.g. webpack-dev-server/client/index.js unless we list them in the
    // config for babel-loader
    WebpackDevServer.addDevServerEntrypoints(config, options);
    setCompilerOptions(compiler, config);
    setCompilerListeners(compiler);
    new WebpackDevServer(compiler, options).listen(port, host, (err) => {
        if (err) {
            throw new PluginError(err);
        }
    });
}

gulp.task('webpackDevServer', webpackDevServerTask);

export default webpackDevServerTask;
