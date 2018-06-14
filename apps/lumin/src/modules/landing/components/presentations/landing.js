import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { colors, spacing } from '@hivekit/core';
import { Container } from '@hivekit/container';
import { Image } from '@hivekit/image';
import { H1 } from '@hivekit/header';
import { Text } from '@hivekit/text';
import { Flex, Box } from '@hivekit/layout';
import { Link } from '@hivekit/link';

import luminLightBulb from 'tio-lumin/images/lumin-light-bulb.png';
import globe from 'tio-lumin/images/globe.png';
import { Patterns } from 'tio-common';

const { PageViewFullWrapper } = Patterns.page;

class LandingView extends Component {
    constructor (props) {
        super(props);

        this.returnToLegacy = this.returnToLegacy.bind(this);
    }

    returnToLegacy () {
        const { location: { hostname } } = window;
        const path = '/dashboards/workbench/vulnerabilities/plugin';

        if (/localhost/.test(hostname)) {
            window.location = `/development.html#${path}`;

            return;
        }

        window.location = `/app.html#${path}`;
    }

    render () {
        const luminLink = 'https://docs.tenable.com/beta/lumin/Content/GettingStarted/LuminBetaGettingStarted.htm';
        const awsConnectorLink = 'https://docs.tenable.com/beta/lumin/Content/Settings/Connectors_AWSConnector.htm';
        const qualysConnectorLink = 'https://docs.tenable.com/beta/lumin/Content/Settings/Connectors_QualysAssetsConnector.htm';
        const formLink = 'https://docs.google.com/forms/d/e/1FAIpQLSdX1W0-8l00zqOwt3LBwuLv8U-I-SUbqvZwPxS2M1VY7NUHMQ/viewform';
        const dataFormSurveyLink = 'https://docs.google.com/forms/d/e/1FAIpQLSfKGVig8ALTkTdUY-j5dpPEgl2IODGMNaS3_J4Ryt4LnyTc7Q/viewform?usp=sf_link';
        const connectorsLink = 'https://cloud.tenable.com/app.html#/settings/connectors';
        const assetImportApiLink = 'https://cloud.tenable.com/api#/resources/assets';
        const slackChannelLink = 'https://tenable-cab.slack.com/messages/GAAD8GQLT';
        const vulnManagementLandingPage = '/dashboards/vulnerability-management';
        const vulnGrid = '/dashboards/vulnerability-management/vulnerabilities/plugins';
        // Turns out this is how you have to do styles in jsx.  Not a long term solution but it fills the gap.
        const linkStyle = { color: colors.actionBlueDark };
        const linkStyleWhite = { color: colors.white, textDecoration: 'underline' };

        const content = (
            <Flex width='100%'>
                <Box width='100%'>
                    <Container
                        borderRadius='0'
                        height='65px'
                        display='block'
                        backgroundColor={colors.actionBlueDarkest}>
                        <Flex
                            width='100%'
                            justifyContent='flex-end'
                            flexWrap='nowrap'>
                            <Button
                                kind='primary'
                                mr={3}
                                mt={2}
                                onClick={this.returnToLegacy}>
                                Back to Tenable.io Production
                            </Button>
                        </Flex>
                    </Container>
                    <Container
                        borderRadius='0'
                        pb={4}
                        pt={4}
                        display='block'
                        backgroundColor={colors.grayLight}>
                        <Flex
                            height='100%'
                            alignItems='center'
                            justifyContent='center'>
                            <Box pr='69px'>
                                <Flex
                                    flexDirection='row'
                                    alignItems='center'
                                    flexWrap='nowrap'>
                                    <Box pb='50px'>
                                        <Image
                                            source={luminLightBulb}
                                            height='250px'
                                            width='250px' />
                                    </Box>
                                    <Box width='905px'>
                                        <H1
                                            style={{ fontSize: '36px', fontWeight: 'normal' }}>
                                            Welcome to the Tenable.io Lumin Beta program
                                        </H1>
                                        <Text
                                            mt={spacing[3]}
                                            style={{ fontFamily: 'open_sans_light' }}
                                            size={2}
                                            lineHeight='30px'>
                                            We will announce all new features and improvements here. We will
                                            occasionally ask for your input and feedback on your experience and what
                                            you&#39;d like to see for Tenable.io Lumin in the future. Check back
                                            regularly as things will be updated about every week.
                                        </Text>
                                        <Text
                                            mt={spacing[2]}
                                            style={{ fontFamily: 'open_sans_light' }}
                                            size={2}
                                            lineHeight='30px'>
                                            Please keep in mind that when you see this page, you are in the Tenable.io
                                            Lumin beta experience. To go back to your regular production experience,
                                            click the “Back to Tenable.io production” button on the upper right.
                                        </Text>
                                        <Text
                                            mt={spacing[2]}
                                            style={{ fontFamily: 'open_sans_light' }}
                                            size={2}
                                            lineHeight='30px'>
                                            Need help or have a suggestion? Read the <Link
                                                style={{ textDecoration: 'underline' }}
                                                activeColor={colors.base}
                                                target='_blank'
                                                to={luminLink}>
                                                documentation
                                            </Link>,
                                            email <a style={linkStyle} href='mailto:luminfeedback@tenable.com'>
                                                luminfeedback@tenable.com
                                            </a>, or
                                            try our <Link
                                                style={{ textDecoration: 'underline' }}
                                                activeColor={colors.base}
                                                target='_blank'
                                                to={slackChannelLink}>
                                                Tenable.io Lumin Slack Channel
                                            </Link>.
                                        </Text>
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>
                    </Container>
                    <Container
                        borderRadius='0'
                        pb={4}
                        display='block'
                        backgroundColor={colors.actionBlueDark}>
                        <Flex
                            height='100%'
                            justifyContent='center'>
                            <Box width='900px'>
                                <Box ml={spacing[6]}>
                                    <Box mt={spacing[4]}>
                                        <Text
                                            size={3}
                                            color={colors.white}
                                            lineHeight='36px'>
                                            June 5, 2018
                                        </Text>
                                        <Text
                                            style={{ fontFamily: 'open_sans_light' }}
                                            color={colors.white}
                                            size={3}
                                            lineHeight='36px'>
                                            As Tenable.io Lumin Beta participants, you are getting a sneak peek at our
                                            brand new Tenable.io re-design that will be released in the upcoming weeks.
                                            The early Tenable.io Lumin visuals you saw at Edge and in the benchmarking
                                            focus group are based on this new design.
                                        </Text>
                                        <Text
                                            style={{ fontFamily: 'open_sans_light' }}
                                            color={colors.white}
                                            size={3}
                                            mt={1}
                                            lineHeight='36px'>
                                            We would like for you to try it out.  Currently we are making available:
                                        </Text>
                                        <ul style={{ color: colors.white }}>
                                            <li>
                                                <Text
                                                    style={{ fontFamily: 'open_sans_light' }}
                                                    color={colors.white}
                                                    size={3}
                                                    ml={4}
                                                    pt={1}
                                                    lineHeight='36px'>
                                                    <Link
                                                        style={{ color: colors.white, textDecoration: 'underline' }}
                                                        activeColor={colors.white}
                                                        hoverColor={colors.white}
                                                        color={colors.white}
                                                        to={vulnManagementLandingPage}>
                                                        Vulnerability Management landing page
                                                    </Link>
                                                </Text>
                                            </li>
                                            <li>
                                                <Text
                                                    style={{ fontFamily: 'open_sans_light' }}
                                                    color={colors.white}
                                                    size={3}
                                                    ml={4}
                                                    pb={2}
                                                    lineHeight='36px'>
                                                    <Link
                                                        style={{ color: colors.white, textDecoration: 'underline' }}
                                                        activeColor={colors.white}
                                                        hoverColor={colors.white}
                                                        color={colors.white}
                                                        to={vulnGrid}>
                                                        Vulnerabilities Grid
                                                    </Link>
                                                </Text>
                                            </li>
                                        </ul>

                                        <Text
                                            style={{ fontFamily: 'open_sans_light' }}
                                            color={colors.white}
                                            size={3}
                                            lineHeight='36px'>
                                            You may run into areas where the re-design has not been put into place
                                            yet. We are continually adding more pages into the new design, so check
                                            back for more updates.
                                        </Text>
                                        <Text
                                            style={{ fontFamily: 'open_sans_light' }}
                                            color={colors.white}
                                            size={3}
                                            mt={1}
                                            lineHeight='36px'>
                                            As always, you can provide input and feedback by contacting us
                                            at <a style={linkStyleWhite} href='mailto:luminfeedback@tenable.com'>
                                                luminfeedback@tenable.com
                                            </a> or in the <Link
                                                style={{ color: colors.white, textDecoration: 'underline' }}
                                                activeColor={colors.white}
                                                hoverColor={colors.white}
                                                color={colors.white}
                                                target='_blank'
                                                to={slackChannelLink}>
                                                Tenable.io Lumin Slack Channel
                                            </Link>.

                                            To get back to this Beta landing page:
                                        </Text>
                                        <ul style={{ color: colors.white }}>
                                            <li>
                                                <Text
                                                    style={{ fontFamily: 'open_sans_light' }}
                                                    color={colors.white}
                                                    size={3}
                                                    ml={4}
                                                    pt={1}
                                                    lineHeight='36px'>In the current UI, click the
                                                    &#34;Lumin Beta&#34; link in the top navigation.
                                                </Text>
                                            </li>
                                            <li>
                                                <Text
                                                    style={{ fontFamily: 'open_sans_light' }}
                                                    color={colors.white}
                                                    size={3}
                                                    ml={4}
                                                    lineHeight='36px'>In the new UI, click the hexagonal icon in
                                                    the upper left when you are in the newly-designed pages, then
                                                    click &#34;Lumin Beta&#34;.
                                                </Text>
                                            </li>
                                        </ul>
                                    </Box>
                                    <Box
                                        style={{ borderTop: `1px solid ${colors.white}` }}
                                        mt={spacing[4]}>
                                        <Text
                                            size={2}
                                            color={colors.white}
                                            lineHeight='36px'>
                                            May 22, 2018
                                        </Text>
                                        <Text
                                            style={{ fontFamily: 'open_sans_light' }}
                                            color={colors.white}
                                            size={2}
                                            lineHeight='36px'>
                                            Now that you&#39;ve gotten to learn more about our <Link
                                                style={{ color: colors.white, textDecoration: 'underline' }}
                                                activeColor={colors.white}
                                                hoverColor={colors.white}
                                                color={colors.white}
                                                target='_blank'
                                                to={connectorsLink}>
                                                Qualys and AWS connectors
                                            </Link> and
                                            our <Link
                                                style={{ color: colors.white, textDecoration: 'underline' }}
                                                activeColor={colors.white}
                                                hoverColor={colors.white}
                                                color={colors.white}
                                                target='_blank'
                                                to={assetImportApiLink}>
                                                Public Asset Import API
                                            </Link>, we&#39;d like to know what other data sources you are interested in
                                            integrating with Tenable.io. <Link
                                                style={{ color: colors.white, textDecoration: 'underline' }}
                                                activeColor={colors.white}
                                                hoverColor={colors.white}
                                                color={colors.white}
                                                target='_blank'
                                                to={dataFormSurveyLink}>
                                                Take this quick survey
                                            </Link> to let us know what you&#39;d like to see.
                                        </Text>
                                    </Box>
                                    <Box
                                        style={{ borderTop: `1px solid ${colors.white}` }}
                                        mt={spacing[4]}>
                                        <Text
                                            size={2}
                                            color={colors.white}
                                            lineHeight='36px'>
                                            May 10, 2018
                                        </Text>
                                        <Text
                                            style={{ fontFamily: 'open_sans_light' }}
                                            color={colors.white}
                                            size={2}
                                            lineHeight='36px'>
                                            <Link
                                                style={{ color: colors.white, textDecoration: 'underline' }}
                                                activeColor={colors.white}
                                                hoverColor={colors.white}
                                                color={colors.white}
                                                target='_blank'
                                                to='https://www.tenable.com/products/tenable-io'>
                                                Tenable.io
                                            </Link> supports importing your asset data from Qualys and AWS through
                                            connectors. Learn more about the <Link
                                                style={{ color: colors.white, textDecoration: 'underline' }}
                                                activeColor={colors.white}
                                                hoverColor={colors.white}
                                                color={colors.white}
                                                target='_blank'
                                                to={qualysConnectorLink}>
                                                Qualys connector
                                            </Link> and
                                            the <Link
                                                style={{ color: colors.white, textDecoration: 'underline' }}
                                                activeColor={colors.white}
                                                hoverColor={colors.white}
                                                color={colors.white}
                                                target='_blank'
                                                to={awsConnectorLink}>
                                                AWS connector
                                            </Link> or <Link
                                                style={{ color: colors.white, textDecoration: 'underline' }}
                                                activeColor={colors.white}
                                                hoverColor={colors.white}
                                                color={colors.white}
                                                target='_blank'
                                                to={connectorsLink}>
                                                just get started
                                            </Link>.
                                        </Text>
                                        <Text
                                            style={{ fontFamily: 'open_sans_light' }}
                                            color={colors.white}
                                            size={2}
                                            lineHeight='36px'>
                                            We also have a Public Asset Import API that is an entry point for
                                            customer-driven integrations.&nbsp;<Link
                                                style={{ color: colors.white, textDecoration: 'underline' }}
                                                activeColor={colors.white}
                                                hoverColor={colors.white}
                                                color={colors.white}
                                                target='_blank'
                                                to={assetImportApiLink}>
                                                Check out the API documentation
                                            </Link> for more information.
                                        </Text>
                                    </Box>
                                    <Box
                                        style={{ borderTop: `1px solid ${colors.white}` }}
                                        mt={spacing[4]}>
                                        <Text
                                            color={colors.white}
                                            size={2}
                                            lineHeight='36px'>
                                            May 9, 2018
                                        </Text>
                                        <Text
                                            style={{ fontFamily: 'open_sans_light' }}
                                            color={colors.white}
                                            size={2}
                                            lineHeight='36px'>
                                            On May 8, we conducted a focus group on Benchmarking. We received some great
                                            feedback that we hope to incorporate into Tenable.io Lumin in the near
                                            future. We would like additional feedback on benchmarking metrics and
                                            capabilities that you&#39;re interested in. Please take 5 minutes on <Link
                                                style={{ color: colors.white, textDecoration: 'underline' }}
                                                activeColor={colors.white}
                                                hoverColor={colors.white}
                                                color={colors.white}
                                                target='_blank'
                                                to={formLink}>
                                                this poll
                                            </Link> that will help shape
                                            benchmarking in Tenable.io Lumin.
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Flex>
                    </Container>
                    <Container
                        borderRadius='0'
                        display='block'
                        backgroundColor='#224A6D'>
                        <Flex
                            height='100%'
                            justifyContent='center'>
                            <Image
                                height='335px'
                                source={globe} />
                        </Flex>
                    </Container>
                    <Container
                        borderRadius='0'
                        height='80px'
                        display='block'
                        backgroundColor={colors.actionBlueDarker}>
                    </Container>
                </Box>
            </Flex>
        );

        return (
            <PageViewFullWrapper
                content={content} />
        );
    }
}

LandingView.propTypes = {
    match: PropTypes.object
};

export {
    LandingView
};
