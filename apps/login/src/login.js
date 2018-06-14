import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import centerComponent from 'react-center-component';

import { Locale } from 'tio-alloy';

import Logo from './components/logo';

const { Selector: LocaleChanger } = Locale.components.containers;

class Login extends Component {
    static propTypes = {
        topOffset: PropTypes.number,
        leftOffset: PropTypes.number,
        routes: PropTypes.arrayOf(PropTypes.element).isRequired
    }

    render () {
        const { topOffset, leftOffset, routes } = this.props;
        const CenteredDiv = styled.div`
            position: absolute;
            width: 350px;
            top: ${topOffset}px;
            left: ${leftOffset}px;
        `;

        return (
            <CenteredDiv>
                <Logo>Tenable.io</Logo>
                <LocaleChanger />
                {routes}
            </CenteredDiv>
        );
    }
}

export default centerComponent(Login);
