import { STEM_NAME } from 'schedule/constants';

export const syncErrors = (state) => {
    const schedule = state.form[STEM_NAME];

    if (schedule && schedule.syncErrors) {
        return schedule.syncErrors;
    }

    return {};
};
