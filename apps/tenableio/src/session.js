import { Rest, Utils } from 'tio-alloy';

class Session {
    constructor () {
        this.BASIC = 16;
        this.STANDARD = 32;
        this.ADMIN = 64;
        this.SYSADMIN = 128;
        this.data = {};
    }

    async fetch () {
        if (this.data.uuid) {
            return Promise.resolve();
        }

        try {
            const data = await Rest.fetch('/session');

            data.token = Utils.storage.get('Iron.token');
            this.parseData(data);
        } catch (err) {
            this.destroy();
        }
    }

    parseData (data) {
        this.data = data;
    }

    hasFeatureFlag (flag) {
        if (this.data.features && this.data.features[flag]) {
            return true;
        }

        return false;
    }

    destroy () {
        Utils.storage.remove('Iron.token');
        window.location = '/';
    }
}

export default new Session();
