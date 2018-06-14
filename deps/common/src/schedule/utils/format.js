/**
 * Consider whether this is needed. Intention is to be a default payload
 * format for a particular service endpoint. createPayloadSelector also accepts
 * a formatting function, so for now this is just a simple pass through.
 */
export const format = (values) => {
    return values;
};
