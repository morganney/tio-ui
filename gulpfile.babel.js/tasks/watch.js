import gulp from 'gulp';
import { argv } from 'yargs';

import buildAlloy from './build-alloy';
import buildCommon from './build-common';
import lint from './lint';
import test from './test';

import { build } from '../config';

function watch (done) {
    const appsGlob = ['apps/**/src/**/*.js', '!apps/**/node_modules'];
    const alloyGlob = 'deps/alloy/src/**/*.js';
    const commonGlob = 'deps/common/src/**/*.js';

    gulp.watch([alloyGlob, commonGlob, ...appsGlob, ...build.lintable]).on('change', lint);
    gulp.watch(alloyGlob, gulp.series(buildAlloy, buildCommon));
    gulp.watch(commonGlob, gulp.parallel(buildCommon));

    if (!argv.skipTests) {
        gulp.watch(appsGlob, gulp.parallel(test));
    }

    done();
}

gulp.task('watch', watch);

export default watch;
