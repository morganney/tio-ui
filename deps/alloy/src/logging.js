/* eslint-disable no-console */

const logLevels = {
    0: 'info',
    1: 'warn',
    2: 'log',
    3: 'error',
    info: 0,
    warn: 1,
    log: 2,
    error: 3
};

const configuredData = {
    remoteLogging: null,
    minLogLevel: 4
};

const messageFactory = (logLevel) => {
    const logAction = logLevels[logLevel];

    return (...messages) => {
        if (logLevel < configuredData.minLogLevel) {
            return;
        }

        console[logAction](...messages);

        if (typeof configuredData.remoteLogging === 'function') {
            configuredData.remoteLogging(...messages);
        }
    };
};

const Logging = {
    configure: (options) => {
        const { remoteLogging, logLevel, debug } = options;

        if (remoteLogging) {
            configuredData.remoteLogging = remoteLogging;
        }

        if (typeof logLevel === 'number' && logLevel >= logLevels.info && logLevel <= logLevels.error) {
            configuredData.minLogLevel = logLevel;
        }

        if (typeof logLevel === 'string' && Object.keys(logLevels).indexOf(logLevel) > -1) {
            configuredData.minLogLevel = logLevels[logLevel];
        }

        if (debug) {
            configuredData.debug = true;
        }
    },
    info: messageFactory(logLevels.info),
    warn: messageFactory(logLevels.warn),
    log: messageFactory(logLevels.log),
    error: messageFactory(logLevels.error),
    trace: () => {
        if (configuredData.debug) {
            console.trace();
        }
    }

};

export default Logging;
