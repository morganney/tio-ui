/**
 * This is here to serve as a cache for a history.listen() callback so that only
 * one is created for destroying the schedule form per session. Once alloy
 * accepts custom middleware this will be removed.
 */
export const historyListener = {};
