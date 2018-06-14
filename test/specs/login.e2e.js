const Login = require('../page-objects/login.js');

const username = 'admin@tenable.int';
const password = 'IntegrationE2e'

describe('login', () => {
    beforeEach(() => {
        browser.url('/');
    })

    it('has the expected title', () => {
        browser.getTitle().should.be.equal('Tenable.io / Login');
    });

    it('can accept a username', () => {
        Login.legacyUsernameInput.setValue(username);
        Login.legacyUsernameInput.getValue().should.be.equal(username);
    });

    it('can accept a password', () => {
        Login.legacyPasswordInput.setValue(password);
        Login.legacyPasswordInput.getValue().should.be.equal(password);
    });

    it('can submit the form', () => {
        Login.legacyUsernameInput.setValue(username);
        Login.legacyPasswordInput.setValue(password);
        Login.loginButton.click();

        browser.waitUntil(() => {
            return browser.getTitle() !== 'Tenable.io / Login';
        }, 120000, 'expected page title to change after a successful login');

        expect(browser.localStorage('GET', 'Iron.Token')).to.satisfy((val) => {
            if (val) {
                return true;
            }

            return false;
        });
    });
});
