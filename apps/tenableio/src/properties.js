import { Rest } from 'tio-alloy';

class Properties {
    constructor () {
        this.defaults = {};
        this.challenge = null;
        this.notifications = [];
        this.evaluation = false;
        this.evaluationLimits = {
            targets: 256,
            scans: 5,
            enabled: true
        };
        this.limitEnabled = false;
        this.two_factor = {
            twilio: false,
            smtp: false
        };
        this.auth = {
            minPasswordLength: 8
        };
    }

    async fetch () {
        if (Object.keys(this.defaults).length) {
            return Promise.resolve();
        }

        const data = await Rest.fetch('/server/properties');
        this.parseData(data);
    }

    parseData (data) {
        this.defaults = data;

        // Check for challenge code during register
        if (data.challenge) {
            this.challenge = data.challenge;
        }

        // Set alert notifications if returned from server
        if (data.notifications) {
            this.notifications = data.notifications;
        }

        // Check to see if certain features are configured
        if (data.capabilities) {
            if (data.capabilities.two_factor) {
                if (data.capabilities.two_factor.twilio) {
                    this.two_factor.twilio = true;
                }

                if (data.capabilities.two_factor.smtp) {
                    this.two_factor.smtp = true;
                }
            }
        }

        if (this.defaults.evaluation) {
            if (this.defaults.evaluation.targets) {
                this.evaluationLimits.targets = this.defaults.evaluation.targets;
            }

            if (this.defaults.evaluation.scans) {
                this.evaluationLimits.scans = this.defaults.evaluation.scans;
            }
        }

        // Process the license data for "Unlimited"
        if (this.defaults.license) {
            const unlimitedLicenseKey = 2147483647;

            for (const licenseKey in this.defaults.license) {
                if (this.defaults.license[licenseKey] === unlimitedLicenseKey ||
                    this.defaults.license[licenseKey] === -1) {
                    this.defaults.license[licenseKey] = 'Unlimited';
                }
            }

            if (this.defaults.license.evaluation) {
                this.evaluation = true;
            }
        }

        if (this.defaults.limitEnabled) {
            this.limitEnabled = true;
        }
    }
}

export default new Properties();
