/**
 * Validator for fields that require a string value.
 * If the field is valid "true" will be returned, otherwise "false";
 *
 * @param  {*} value Form field value to validate
 * @return {Boolean}
 */
const requiredAsString = (value) => {
    if (typeof value === 'string' && value) {
        return true;
    }

    return false;
};

export {
    requiredAsString
};
