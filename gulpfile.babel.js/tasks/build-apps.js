import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import StatsPlugin from 'stats-webpack-plugin';
import { argv } from 'yargs';

import webpackConfig from '../../webpack.config.babel.prod';
import { build } from '../config';

function buildApps () {
    const config = {
        ...webpackConfig(argv)
    };

    // If the stats flag is turned on, output the stats to a file
    if (argv.stats) {
        config.plugins.push(new StatsPlugin('stats.json'));
    }

    return webpackStream(config, webpack).pipe(gulp.dest(build.dest));
}

gulp.task('buildApps', buildApps);

export default buildApps;
