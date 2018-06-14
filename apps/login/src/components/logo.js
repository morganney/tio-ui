import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import tenableLogo from '../images/tenable-io-logo.svg';

const Logo = ({ className, children }) => {
    return <h1 className={className}>{children}</h1>;
};
const StyledLogo = styled(Logo)`
    text-indent: -1000px;
    height: 70px;
    margin: 20px 0;
    width: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(${tenableLogo});
`;

Logo.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default StyledLogo;
