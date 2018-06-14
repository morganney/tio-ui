import gulp from 'gulp';
import jest from 'jest-cli';
import { argv } from 'yargs';

const jestConfig = {
    rootDir: './'
};

if (argv.coverage) {
    jestConfig.collectCoverage = true;
    jestConfig.coverageFormats = ['html'];
}

function test (done) {
    jest.runCLI({
        config: jestConfig,
        silent: true,
        coverage: argv.coverage,
        testPathPattern: argv.testPathPattern
    }, '.').then(() => {
        done();
    });
}

gulp.task('test', test);

export default test;
