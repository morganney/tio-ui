import * as schedule from './schedule';

const reducers = [
    {
        branch: 'common',
        stems: [
            {
                name: schedule.constants.STEM_NAME,
                reducer: schedule.reducers
            }
        ]
    }
];

export {
    reducers
};
