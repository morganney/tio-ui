const required = (value) => {
    return typeof value !== 'undefined' && value !== '' && value !== null;
};

required.message = 'Missing value.';

export {
    required
};
