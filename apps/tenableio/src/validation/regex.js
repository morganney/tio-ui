const regex = (value, expr) => {
    return value.match(new RegExp(expr)) !== null;
};

regex.message = 'Invalid format.';

export {
    regex
};
