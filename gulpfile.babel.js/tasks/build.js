/**
 * Builds a production ready artifact for deployment
 */

import gulp from 'gulp';

import clean from './clean';
import buildAlloy from './build-alloy';
import buildCommon from './build-common';
import buildApps from './build-apps';
import lint from './lint';

const buildTask = gulp.series(
    clean,
    buildAlloy,
    buildCommon,
    lint,
    buildApps
);

gulp.task('build', buildTask);

export default buildTask;
