import * as session from './modules/session';
import * as properties from './modules/properties';

const reducer = [
    {
        branch: 'core',
        reducer: {
            session: session.reducer.session,
            properties: properties.reducer.properties
        }
    }
];

export {
    reducer
};
