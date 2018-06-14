import { ENTER_CAPTCHA_ANSWER } from '../actions/enter-captcha-answer';

const captchaAnswer = (state = '', action) => {
    switch (action.type) {
        case ENTER_CAPTCHA_ANSWER:
            return action.payload;
        default:
            return state;
    }
};

export default captchaAnswer;
