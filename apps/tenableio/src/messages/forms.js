import { defineMessages } from 'react-intl';

const formMessages = defineMessages({
    placeholderUsername: {
        id: 'USERNAME_PLACEHOLDER',
        description: 'username literal for use in placeholders and input types',
        defaultMessage: 'Username'
    },
    placeholderPassword: {
        id: 'PASSWORD_PLACEHOLDER',
        description: 'password literal for use in placeholders and input types',
        defaultMessage: 'Password'
    },
    validationNoEmptyInput: {
        id: 'NO_EMPTY_INPUT',
        description: `error message for invalid empty form inputs.
                     Type is expecting an identifier for the input with an error
                     e.g. username, password, ips, assetName etc`,
        defaultMessage: '{type} must not be blank'
    },
    validationGenericFormErrors: {
        id: 'FORM_HAS_ERRORS',
        description: 'a form being submitted has one or more errors',
        defaultMessage: 'Please correct invalid form {count, plural, one {element} other {elements}}'
    },
    trueInputLabel: {
        id: 'FORM_TRUE_LABEL',
        description: 'Label for a "true" input on a generic form',
        defaultMessage: 'true'
    },
    falseInputLabel: {
        id: 'FORM_FALSE_LABEL',
        description: 'Label for a "false" input on a generic form',
        defaultMessage: 'false'
    }
});

export { formMessages };
