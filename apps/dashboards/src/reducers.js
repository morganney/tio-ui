import * as dashboard from './modules/dashboard';

export default [
    {
        branch: 'dashboards',
        stems: [
            {
                name: dashboard.constants.STEM_NAME,
                reducer: dashboard.reducer
            }
        ]
    }
];
