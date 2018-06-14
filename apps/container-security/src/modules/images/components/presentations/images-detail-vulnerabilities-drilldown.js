import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Plane,
    PlanePreview,
    PlanePreviewHeader,
    PlanePreviewHeaderView,
    PlanePreviewAttr,
    PlanePreviewAttrItem,
    PlanePreviewDesc
} from '@hivekit/plane';
import { Text } from '@hivekit/text';

import { VulnIconComponent } from '../';

class ImagesDetailVulnsDrilldownView extends Component {
    static propTypes = {
        // Redux data fields
        currentDetailImageVuln: PropTypes.object.isRequired,
        imagesDetailVulnPlaneDisplay: PropTypes.string.isRequired,

        // Redux dispatches
        toggleDetailImageVulnPlane: PropTypes.func.isRequired
    }

    constructor () {
        super();

        this.onPlaneChange = this.onPlaneChange.bind(this);
        this.attributeContent = this.attributeContent.bind(this);
        this.previewHeader = this.previewHeader.bind(this);
        this.previewContent = this.previewContent.bind(this);
    }

    onPlaneChange (res) {
        const { toggleDetailImageVulnPlane, imagesDetailVulnPlaneDisplay } = this.props;

        if (res !== imagesDetailVulnPlaneDisplay && res === 'closed') {
            toggleDetailImageVulnPlane(res);
        }
    }

    attributeContent () {
        const {
            published_date: publishedDate,
            cvss_score: cvssScore,
            access_vector: accessVector,
            access_complexity: accessComplexity,
            auth,
            confidentiality_impact: confidentialityImpact,
            integrity_impact: integrityImpact,
            availability_impact: availabilityImpact,
            reference_id: referenceId,
            cpe
        } = this.props.currentDetailImageVuln;

        return (
            <Fragment>
                <PlanePreviewAttrItem label='RELEASE DATE'>
                    <Text size={1}>
                        {publishedDate || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label='CVSS v2 BASE SCORE'>
                    <Text size={1}>
                        {cvssScore || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label='ACCESS VECTOR'>
                    <Text size={1}>
                        {accessVector || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label='ACCESS COMPLEXITY'>
                    <Text size={1}>
                        {accessComplexity || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label='AUTHENTICATION'>
                    <Text size={1}>
                        {auth || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label='CONFIDENTIALITY IMPACT'>
                    <Text size={1}>
                        {confidentialityImpact || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label='INTEGRITY IMPACT'>
                    <Text size={1}>
                        {integrityImpact || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label='AVAILABILITY IMPACT'>
                    <Text size={1}>
                        {availabilityImpact || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label='REFERENCE'>
                    <Text size={1}>
                        {referenceId || ''}
                    </Text>
                </PlanePreviewAttrItem>
                <PlanePreviewAttrItem label='COMMON PLATFORM ENUMERATON (CPE)' span={true}>
                    <Text size={1}>
                        {cpe || ''}
                    </Text>
                </PlanePreviewAttrItem>
            </Fragment>
        );
    }

    previewHeader () {
        const { currentDetailImageVuln } = this.props;
        const { cve, description } = this.props.currentDetailImageVuln;
        const content = (
            <PlanePreviewHeaderView
                title={cve || ''}
                description={description || ''} />
        );

        const vulnIcon = (
            <VulnIconComponent
                riskScore={currentDetailImageVuln.cvss_score} />
        );

        return (
            <PlanePreviewHeader
                iconComponent={vulnIcon}
                contentComponent={content} />
        );
    }

    previewContent () {
        const { remediation } = this.props.currentDetailImageVuln;

        const secondaryDescriptionRenderer = () => {
            return (
                <Fragment>
                    <PlanePreviewDesc description={remediation || ''} />
                </Fragment>
            );
        };

        const attributesRenderer = () => {
            return (
                <PlanePreviewAttr
                    content={this.attributeContent()} />
            );
        };

        return (
            <Fragment>
                {secondaryDescriptionRenderer()}
                {attributesRenderer()}
            </Fragment>
        );
    }

    render () {
        const { imagesDetailVulnPlaneDisplay } = this.props;
        const renderPreview = () => {
            return (
                <PlanePreview
                    header={this.previewHeader()}
                    content={this.previewContent()}>
                </PlanePreview>
            );
        };

        return (
            <Plane
                onChange={this.onPlaneChange}
                preview={renderPreview}
                display={imagesDetailVulnPlaneDisplay}>
            </Plane>
        );
    }
}

export {
    ImagesDetailVulnsDrilldownView
};
