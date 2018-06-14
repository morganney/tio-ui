import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    PlanePreview,
    PlanePreviewHeader,
    PlanePreviewHeaderView,
    PlanePreviewAttr,
    PlanePreviewAttrItem
} from '@hivekit/plane';
import { Container } from '@hivekit/container';
import { VulnerabilitiesIcon } from '@hivekit/icon';
import { Text } from '@hivekit/text';
import { H3 } from '@hivekit/header';
import { intlShape } from 'react-intl';

import executiveSummary from '../../images/f51d1ada-492e-415b-83b3-5fb2c8ee302d.png';
import exploitableFrameworkAnalysis from '../../images/2848f20d-30a6-4b8e-8737-b0cc3e0de26f.png';
import exploitableByMalware from '../../images/22efa9b9-ebf5-4c87-ac45-b1505824b207.png';
import measuringVulnerabilityManagement from '../../images/32e3d265-aa54-401d-a8af-dc05dee21a3f.png';
import mitigationSummary from '../../images/ea78a933-58de-4eb3-9719-e3ce19810694.png';
import outstandingRemediationTracking from '../../images/c5c34a98-a9cf-40c4-ba85-362cdf1e895b.png';
import prioritizeAssets from '../../images/203e0ceb-ee90-4e73-8574-c987e101b6bc.png';
import securityManagementSummary from '../../images/9afce61c-3f06-4037-9105-3aabf80ca479.png';
import spectreAndMeltdown from '../../images/0e478071-c225-409e-adeb-e6f7278e9e6a.png';
import vMAppLandingPage from '../../images/f990c5a3-63a0-45f8-bca7-2d6c932b70d8.png';
import vulnerabilitiesByCommonPorts from '../../images/40c2e9e8-cc7a-4474-8fb1-e34c3ef51a22.png';
import vulnerabilityManagement from '../../images/90cc8c91-1627-424a-9f0c-337c1633be06.png';
import webServices from '../../images/ae800e72-1908-4245-8b2b-58b0dbcde1d1.png';
import { dashboardTemplatePreview as previewMsg } from '../../messages';

const imgMap = {
    'f51d1ada-492e-415b-83b3-5fb2c8ee302d': executiveSummary,
    '2848f20d-30a6-4b8e-8737-b0cc3e0de26f': exploitableFrameworkAnalysis,
    '22efa9b9-ebf5-4c87-ac45-b1505824b207': exploitableByMalware,
    '32e3d265-aa54-401d-a8af-dc05dee21a3f': measuringVulnerabilityManagement,
    'ea78a933-58de-4eb3-9719-e3ce19810694': mitigationSummary,
    'c5c34a98-a9cf-40c4-ba85-362cdf1e895b': outstandingRemediationTracking,
    '203e0ceb-ee90-4e73-8574-c987e101b6bc': prioritizeAssets,
    '9afce61c-3f06-4037-9105-3aabf80ca479': securityManagementSummary,
    '0e478071-c225-409e-adeb-e6f7278e9e6a': spectreAndMeltdown,
    'f990c5a3-63a0-45f8-bca7-2d6c932b70d8': vMAppLandingPage,
    '40c2e9e8-cc7a-4474-8fb1-e34c3ef51a22': vulnerabilitiesByCommonPorts,
    '90cc8c91-1627-424a-9f0c-337c1633be06': vulnerabilityManagement,
    'ae800e72-1908-4245-8b2b-58b0dbcde1d1': webServices
};

const DashboardTemplatePreviewView = ({
    dashboardTemplatePreview,
    intl
}) => {
    const imgStyles = {
        width: '100%',
        borderRadius: '10px'
    };
    const headerStyles = {
        marginBottom: '8px'
    };

    return (
        <Container p={2}>
            {
                dashboardTemplatePreview.name
                    ? <PlanePreview
                        header={
                            <PlanePreviewHeader
                                contentComponent={
                                    <PlanePreviewHeaderView
                                        title={dashboardTemplatePreview.name}
                                        titleIsEditable={false} />
                                }
                                iconComponent={<VulnerabilitiesIcon />}
                            />
                        }
                        content={
                            <PlanePreviewAttr content={
                                <Fragment>
                                    <PlanePreviewAttrItem label='' span={true}>
                                        <img src={
                                            imgMap[dashboardTemplatePreview.uuid]
                                        } style={imgStyles} alt='Template Preview' />
                                    </PlanePreviewAttrItem>
                                    <PlanePreviewAttrItem label=''>
                                        <H3 style={headerStyles}>
                                            {intl.formatMessage(previewMsg.dashboardTemplatePreviewSummary)}
                                        </H3>
                                        <Text size={1} mr={8}>{dashboardTemplatePreview.description}</Text>
                                    </PlanePreviewAttrItem>
                                    <PlanePreviewAttrItem label=''>
                                        <H3 style={headerStyles}>
                                            {intl.formatMessage(previewMsg.dashboardTemplatePreviewWidgets)}
                                        </H3>
                                        {
                                            dashboardTemplatePreview.components.map((item) => {
                                                return (
                                                    <Text size={1} mb={1} key={item.uuid}>{item.name}</Text>
                                                );
                                            })
                                        }
                                    </PlanePreviewAttrItem>
                                </Fragment>
                            } />
                        }>
                    </PlanePreview>
                    : null
            }
        </Container>
    );
};

DashboardTemplatePreviewView.propTypes = {
    dashboardTemplatePreview: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};

export {
    DashboardTemplatePreviewView
};
