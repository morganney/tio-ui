import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@hivekit/table';
import { ContainerIcon } from '@hivekit/icon';

import { ImagesDetailInventoryMessages } from 'tio-container-security/modules/images/messages';

class ImagesDetailInvView extends Component {
    static propTypes = {
        // Redux data fields
        currentDetailImage: PropTypes.object.isRequired,
        imageInventory: PropTypes.object.isRequired,
        isImageInventoryFetching: PropTypes.bool.isRequired,

        // Dispatches
        fetchImageInventory: PropTypes.func.isRequired,

        intl: PropTypes.object.isRequired
    }

    render () {
        const { imageInventory, isImageInventoryFetching, intl } = this.props;
        const { columnPackageName, columnPackageVersion } = ImagesDetailInventoryMessages;
        const inventoryColumns = [
            {
                headerName: intl.formatMessage(columnPackageName),
                field: 'name',
                suppressSorting: true
            },
            {
                headerName: intl.formatMessage(columnPackageVersion),
                field: 'version',
                suppressSorting: true
            }
        ];

        let inventoryRecords = [];
        let errorMessage = null;

        if (Array.isArray(imageInventory.packages)) {
            inventoryRecords = imageInventory.packages;
        }

        if (imageInventory.errorMessage) {
            errorMessage = imageInventory.errorMessage;
        }

        const getCheckboxIcon = () => {
            return (
                <ContainerIcon />
            );
        };

        return (
            <Table
                allowSelection={true}

                rows={inventoryRecords}
                columns={inventoryColumns}
                checkboxIconComponent={getCheckboxIcon}
                fetching={isImageInventoryFetching}
                error={errorMessage}
            />
        );
    }
}

export {
    ImagesDetailInvView
};
