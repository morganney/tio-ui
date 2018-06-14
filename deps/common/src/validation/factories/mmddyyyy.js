export const mmddyyyy = (delimiter = '/') => {
    return (value) => {
        switch (delimiter) {
            case '/':
                return /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(value);
            case '-':
                return /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/.test(value);
            case '.':
                return /^(0[1-9]|1[0-2])\.(0[1-9]|1\d|2\d|3[01])\.(19|20)\d{2}$/.test(value);
            case ' ':
                return /^(0[1-9]|1[0-2]) (0[1-9]|1\d|2\d|3[01]) (19|20)\d{2}$/.test(value);
            default:
                return false;
        }
    };
};
