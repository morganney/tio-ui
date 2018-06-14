import path from 'path';

import gulp from 'gulp';
import del from 'del';
import { argv } from 'yargs';

import { deps, apps } from '../config';

const depsDest = Object.keys(deps).map((dep) => {
    return deps[dep].dest;
});

function clean () {
    let delList = [
        'dist',
        deps.alloy.i18n.localeDataDest,
        ...depsDest
    ];

    if (argv['node-modules']) {
        delList = delList.concat(
            path.join(__dirname, '../../node_modules'),
            Object.keys(deps).map((dep) => {
                return path.join(deps[dep].root, 'node_modules');
            }),
            Object.keys(apps).map((app) => {
                return path.join(apps[app].root, 'node_modules');
            })
        );
    }

    return del(delList);
}

gulp.task('clean', clean);

export default clean;
