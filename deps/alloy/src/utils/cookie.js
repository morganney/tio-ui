const set = (name, value) => {
    document.cookie = `${name}=${encodeURI(value)};secure;`;
};

const cookie = {
    set
};

export {
    cookie
};
