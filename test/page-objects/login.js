const Page = require('./page.js');

const Login = Object.create(Page, {
    usernameInput: { get: () => { return browser.element('input[name="username"]'); } },
    passwordInput: { get: () => { return browser.element('input[name="password"]'); } },
    loginButton: { get: () => { return browser.element('button[type="submit"]'); } },
    legacyUsernameInput: { get: () => { return browser.element('input[placeholder="Username"]'); } },
    legacyPasswordInput: { get: () => { return browser.element('input[placeholder="Password"]'); } }
});

module.exports = Login;
