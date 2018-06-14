import spawn from 'cross-spawn';
import gulp from 'gulp';

import { deps } from '../config';

function buildAlloy () {
    const prepare = spawn('yarn', ['run', 'prepare'], {
        cwd: deps.alloy.root,
        stdio: 'inherit'
    });

    prepare.on('exit', (code) => {
        if (code !== 0) {
            prepare.emit('end');
        }
    });

    return prepare;
}

gulp.task('buildAlloy', buildAlloy);

export default buildAlloy;
