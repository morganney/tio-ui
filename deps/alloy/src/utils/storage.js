import isObject from 'lodash/isObject';

let storageInterface = {};

if (window.localStorage) {
    storageInterface = window.localStorage;
}

const set = (key = null, val = null) => {
    if (!key || !val) {
        return;
    }

    let setVal = val;

    if (isObject(setVal)) {
        setVal = JSON.stringify(setVal);
    }

    storageInterface[key] = setVal;
};

const get = (key = null) => {
    let retrievedStorage = null;

    if (key && storageInterface.hasOwnProperty(key)) {
        try {
            retrievedStorage = JSON.parse(storageInterface[key]);
        } catch (e) {
            retrievedStorage = storageInterface[key];
        }
    }

    return retrievedStorage;
};

const exists = (key = null) => {
    if (key && storageInterface.hasOwnProperty(key)) {
        return true;
    }

    return false;
};

const remove = (key = null) => {
    if (key && storageInterface.hasOwnProperty(key)) {
        delete storageInterface[key];
    }
};

const storage = {
    set,
    get,
    exists,
    remove
};

export { storage };
