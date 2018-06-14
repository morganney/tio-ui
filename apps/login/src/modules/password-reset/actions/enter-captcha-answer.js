export const ENTER_CAPTCHA_ANSWER = 'password-reset/enter-captcha-answer';
export const enterCaptchaAnswer = (answer) => {
    return {
        type: ENTER_CAPTCHA_ANSWER,
        payload: answer
    };
};
