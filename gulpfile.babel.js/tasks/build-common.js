import spawn from 'cross-spawn';
import gulp from 'gulp';

import { deps } from '../config';

function buildCommon () {
    const prepare = spawn('yarn', ['run', 'prepare'], {
        cwd: deps.common.root,
        stdio: 'inherit'
    });

    prepare.on('exit', (code) => {
        if (code !== 0) {
            prepare.emit('end');
        }
    });

    return prepare;
}

gulp.task('buildCommon', buildCommon);

export default buildCommon;
