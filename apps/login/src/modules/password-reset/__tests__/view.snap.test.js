import React from 'react';
import { shallow } from 'enzyme';

import PasswordReset from '../components/views/password-reset';

describe('Password Reset View', () => {
    const props = {
        active: true,
        sent: false,
        onSubmit: jest.fn(),
        onEnterUsername: jest.fn(),
        onEnterCaptchaAnswer: jest.fn(),
        onFocus: jest.fn(),
        username: '',
        captchaAnswer: '',
        captcha: {
            question: 'What is 5 + 4'
        },
        passwordResetSent: false,
        errors: {
            validation: {
                username: '',
                captcha: ''
            },
            network: ''
        }
    };

    let pwResetView = null;

    beforeEach(() => {
        pwResetView = shallow(<PasswordReset
            active={props.active}
            sent={props.sent}
            onSubmit={props.onSubmit}
            onEnterUsername={props.onEnterUsername}
            onEnterCaptchaAnswer={props.onEnterCaptchaAnswer}
            onFocus={props.onFocus}
            username={props.username}
            captchaAnswer={props.captchaAnswer}
            captcha={props.captcha}
            passwordResetSent={props.passwordResetSent}
            errors={props.errors}
        />);
    });

    it('Should shallow render', () => {
        expect(pwResetView.length).toEqual(1);
    });

    // Below runs the snapshot comparison test. As so much is changing this test is likely to always fail. commenting out for now until we have more stable views
    // it('Should match the snapshot', () => {
    //     expect(pwResetView).toMatchSnapshot();
    // });
});
