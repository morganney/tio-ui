import gulp from 'gulp';
import log from 'fancy-log';
import PluginError from 'plugin-error';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import proxy from 'http-proxy-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import { argv } from 'yargs';

import browserSync from '../browser-sync';
import getWebpackConfig from '../../webpack.config.babel';

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

function serverTask (env, ee) {
    const config = { ...getWebpackConfig(env), devtool: 'inline-source-map' };

    webpack(config, (err, stats) => {
        const compiler = new Compiler();
        let target = 'https://qa-develop.cloud.aws.tenablesecurity.com';

        if (err || stats.hasErrors()) {
            throw new PluginError(err);
        }

        if (argv.target) {
            target = argv.target;
        }

        log(stats.toString({
            colors: true
        }));

        setCompilerOptions(compiler, config);

        browserSync.init({
            host: '0.0.0.0',
            port: '3000',
            server: {
                baseDir: config.output.path,
                middleware: [
                    historyApiFallback(),
                    proxy('/api', {
                        target,
                        changeOrigin: true,
                        pathRewrite: { '^/api': '' }
                    }),
                    webpackDevMiddleware(compiler, {
                        publicPath: config.output.publicPath,
                        stats: 'minimal'
                    })
                ]
            }
        }, () => {
            compiler.plugin('done', () => {
                browserSync.reload();
            });
            ee.emit('done');
        });
    });
}

gulp.task('server', serverTask);

export default serverTask;
