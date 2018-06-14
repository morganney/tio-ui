import { Utils } from 'tio-alloy';

const session = {
    destroy: () => {
        Utils.storage.remove('Iron.token');
        window.location = '/';
    }
};

export { session };
