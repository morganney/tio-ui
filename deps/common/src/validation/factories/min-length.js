export const minLength = (min) => {
    return (value) => {
        return value && value.length >= min;
    };
};
