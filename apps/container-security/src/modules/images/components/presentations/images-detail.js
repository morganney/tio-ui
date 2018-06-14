import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, TabPanel } from '@hivekit/tabs';

import { ImagesDetailMessages } from 'tio-container-security/modules/images/messages';

import {
    ImagesDetailInvComponent,
    ImagesDetailVulnsComponent,
    ImagesDetailDigestComponent,
    ImagesDetailMalwareComponent
} from '../';

const vulnerabilitiesContentRenderer = () => {
    return (
        <TabPanel>
            <ImagesDetailVulnsComponent/>
        </TabPanel>
    );
};

const packageInventoryContentRenderer = () => {
    return (
        <TabPanel>
            <ImagesDetailInvComponent/>
        </TabPanel>
    );
};

const layerDigestContentRenderer = () => {
    return (
        <TabPanel>
            <ImagesDetailDigestComponent/>
        </TabPanel>
    );
};

const malwareContentRenderer = () => {
    return (
        <TabPanel>
            <ImagesDetailMalwareComponent/>
        </TabPanel>
    );
};

class ImagesDetailView extends Component {
    static propTypes = {
        intl: PropTypes.object.isRequired
    }

    render () {
        const { intl } = this.props;
        const {
            tabVulnerabilities,
            tabPackageInventory,
            tabLayerDigest,
            tabMalware
        } = ImagesDetailMessages;

        return (
            <Tabs>
                <Tab
                    title={intl.formatMessage(tabVulnerabilities)}
                    componentRenderer={vulnerabilitiesContentRenderer} />
                <Tab
                    title={intl.formatMessage(tabPackageInventory)}
                    componentRenderer={packageInventoryContentRenderer} />
                <Tab
                    title={intl.formatMessage(tabLayerDigest)}
                    componentRenderer={layerDigestContentRenderer} />
                <Tab
                    title={intl.formatMessage(tabMalware)}
                    componentRenderer={malwareContentRenderer} />
            </Tabs>
        );
    }
}

export {
    ImagesDetailView
};
