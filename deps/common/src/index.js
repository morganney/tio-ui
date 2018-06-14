import { Store, Utils } from 'tio-alloy';

import * as Patterns from './patterns';
import * as schedule from './schedule';
import * as validation from './validation';
import { session } from './session';
import { reducers } from './reducers';
import { constants } from './constants';

Store.mount({
    name: 'common',
    reducers: Utils.processReducerTrees(reducers)
});

export {
    Patterns,
    schedule,
    session,
    validation,
    constants
};
