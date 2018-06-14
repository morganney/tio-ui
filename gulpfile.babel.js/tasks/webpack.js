import gulp from 'gulp';
import log from 'fancy-log';
import PluginError from 'plugin-error';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import proxy from 'http-proxy-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import { argv } from 'yargs';

import webpackConfig from '../../webpack.config.babel';
import browserSync from '../browser-sync';
import { build } from '../config';

/**
 * Webpack build as a gulp stream.
 *
 * @param  {Object} env The env object used by webpack's cli
 * @param  {Object} ee  Node event emitter to signal async task completion while using webpack watch.
 * @return {Stream}
 */
function webpackTask (env, ee) {
    const target = 'https://qa-develop.cloud.aws.tenablesecurity.com';
    const config = {
        ...webpackConfig(env),
        devtool: 'inline-source-map',
        watch: true
    };

    browserSync.init({
        host: '0.0.0.0',
        port: '3000',
        server: {
            baseDir: [build.dest],
            middleware: [
                proxy('/api', {
                    target: argv.target ? argv.target : target,
                    changeOrigin: true,
                    pathRewrite: { '^/api': '' }
                }),
                historyApiFallback()
            ]
        }
    });

    return webpackStream(config, webpack, (err, stats) => {
        if (err) {
            throw new PluginError(err);
        }

        log(stats.toString({
            colors: true
        }));
        ee.emit('done');
        // FIXME: browser sync is loading before assets are in build.dest
    }).pipe(gulp.dest(build.dest));
}

gulp.task('webpack', webpackTask);

export default webpackTask;
