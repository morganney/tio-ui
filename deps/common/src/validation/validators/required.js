const types = [
    ['object', {}],
    ['boolean', true],
    ['number', 1],
    ['string', 'string'],
    ['function', function () { return true; }],
    ['symbol', Symbol('symbol')]
];
const typesMap = new Map(types);

export const required = (value, type = null) => {
    if (type) {
        const selectedType = typesMap.get(type);

        return typeof value === typeof selectedType;
    }

    if (value) {
        return true;
    }

    return false;
};
