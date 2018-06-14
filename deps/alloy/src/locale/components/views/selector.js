import React from 'react';
import PropTypes from 'prop-types';

const Selector = ({
    locales,
    current,
    onLocaleChange
}) => {
    const handleLocaleChange = (evt) => {
        onLocaleChange(evt.currentTarget.value);
    };

    return (
        <select defaultValue={current} onBlur={handleLocaleChange}>
            {locales.map((locale) => {
                return <option key={locale}>{locale}</option>;
            })}
        </select>
    );
};

Selector.propTypes = {
    locales: PropTypes.array.isRequired,
    current: PropTypes.string.isRequired,
    onLocaleChange: PropTypes.func.isRequired
};

export default Selector;
