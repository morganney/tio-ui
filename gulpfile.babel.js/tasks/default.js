/**
 * Default task in this case is to start a development environment.
 */

import gulp from 'gulp';
import { argv } from 'yargs';

import clean from './clean';
import lint from './lint';
import watch from './watch';
import test from './test';
import buildAlloy from './build-alloy';
import buildCommon from './build-common';
import webpackDevServer from './webpack-dev-server';

const tasks = [clean, gulp.series(buildAlloy, buildCommon), lint];

if (!argv.skipTests) {
    tasks.push(test);
}

const defaultTask = gulp.series(
    ...tasks,
    watch,
    webpackDevServer
);

gulp.task('default', defaultTask);

export default defaultTask;
