/**
 * Rounds and truncates a number according to the business rules:
     1,000 - 9,999:
     Round to hundred with 1 decimal place
     Example: 1,234 -> 1.2K

     10,000 - 999,999
     Round to thousand, no decimal
     Example: 789,765 -> 790K

     1,000,000 - 9,999,999
     Round to hundred thousand with 1 decimal place
     Example: 1,234,793 -> 1.2M

     10,000,000 - 999,999,999
     Round to million, no decimal
     Example: 787,523,891 -> 788M

 * @param {number} [rawNumber] - the number to round and truncate
 */
const truncateNumber = (rawNumber) => {
    const truncatedNumber = Math.abs(Number(rawNumber));
    const oneThousand = 1e+3;
    const tenThousand = 1e+4;
    const oneMillion = 1e+6;
    const tenMillion = 1e+7;
    const oneBillion = 1e+9;
    const roundToHundreds = -2;
    const roundToThousands = -3;
    const roundToHundredThousands = -5;
    const roundToMillions = -6;
    const sign = rawNumber < 0 ? '-' : '';

    // As long as it can be converted to a number, we can return a truncated string to represent it
    if (!isNaN(truncatedNumber)) {
        if (truncatedNumber >= oneThousand && truncatedNumber < tenThousand) {
            return {
                value: `${sign}${round(truncatedNumber, roundToHundreds) / oneThousand}`,
                abbreviation: 'K'
            };
        }

        if (truncatedNumber >= tenThousand && truncatedNumber < oneMillion) {
            return {
                value: `${sign}${round(truncatedNumber, roundToThousands) / oneThousand}`,
                abbreviation: 'K'
            };
        }

        if (truncatedNumber >= oneMillion && truncatedNumber < tenMillion) {
            return {
                value: `${sign}${round(truncatedNumber, roundToHundredThousands) / oneMillion}`,
                abbreviation: 'M'
            };
        }

        if (truncatedNumber >= tenMillion && truncatedNumber < oneBillion) {
            return {
                value: `${sign}${round(truncatedNumber, roundToMillions) / oneMillion}`,
                abbreviation: 'M'
            };
        }
    }

    // If all else fails, return the original value
    return {
        value: rawNumber
    };
};

/**
 * Round a number to a given decimal precision, where a positive value for precision rounds to that many decimal places,
 * and a negative precision value rounds the number to 10^precision places. Example: round(987654, -3) -> 988000
 *
 * @param {number} [number] - the number to round
 * @param {number} [precision] - the desired decimal precision
 */
const round = (number, precision = 0) => {
    const shift = (shiftNumber, exponent) => {
        const numArray = String(shiftNumber).split('e');

        return Number(`${numArray[0]}e${numArray[1] ? (Number(numArray[1]) + exponent) : exponent}`);
    };

    return shift(Math.round(shift(number, Number(precision))), -Number(precision));
};

export {
    truncateNumber
};
