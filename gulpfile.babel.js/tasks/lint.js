import gulp from 'gulp';
import log from 'fancy-log';
import colors from 'ansi-colors';
import through from 'through2';
import eslint from 'gulp-eslint';

import { deps, apps, build } from '../config';

function beep () {
    process.stdout.write('\u0007');
}

function getSource () {
    const src = [];

    for (const dep in deps) {
        src.push(deps[dep].js);
        src.push(deps[dep].build);
    }

    for (const app in apps) {
        src.push(apps[app].js);
    }

    src.push(...build.lintable);

    return src.splice(0);
}

function handleResults (results) {
    if (results.errorCount) {
        beep();
    } else {
        log(colors.green('✓ Linting Successful'));
    }
}

function lint (src) {
    const errorHandler = () => {
        if (process.env.NODE_ENV === 'production') {
            return eslint.failAfterError();
        }

        return through.obj();
    };
    const source = typeof src === 'string' ? src : getSource();

    return gulp.src(source)
        .pipe(eslint())
        .pipe(eslint.results(handleResults))
        .pipe(eslint.format())
        .pipe(errorHandler());
}

gulp.task('lint', lint);

export default lint;
