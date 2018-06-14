import Store from './store';

const polls = {};

const Poll = {
    // NOTE: Action in all cases below is expected to be the generated action object returned from an action creator.
    // This means when you call a poll you call the action creator and pass the result into these methods.
    // This gives the most control what data the action creator consumes to generate the action used in the poll methods
    start: (name, action, interval) => {
        if (polls.hasOwnProperty(name) || !name || !action || !interval) {
            return;
        }

        Store.dispatch(action);

        polls[name] = setInterval(() => {
            Store.dispatch(action);
        }, interval);
    },

    clear: (name, action) => {
        if (!polls[name]) {
            return;
        }

        clearInterval(polls[name]);

        delete polls[name];

        if (action) {
            Store.dispatch(action);
        }
    },

    clearAll: (action) => {
        Object.keys(polls).forEach((thisPoll) => {
            clearInterval(polls[thisPoll]);
        });

        if (action) {
            Store.dispatch(action);
        }
    }
};

export { Poll };
