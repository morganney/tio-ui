import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@hivekit/table';

import { Utils } from 'tio-alloy';
import { ImagesDetailVulnerabilitiesMessages } from 'tio-container-security/modules/images/messages';

import { ImagesDetailVulnsDrilldownComponent, VulnIconComponent } from '../';

const { dateFormat, dateFormatStrings } = Utils;
const { DATE_FORMAT_MONTH_DAY } = dateFormatStrings;

class ImagesDetailVulnsView extends Component {
    static propTypes = {
        // Redux data fields
        imageVulnerabilities: PropTypes.object.isRequired,
        isImageVulnerabilitiesFetching: PropTypes.bool.isRequired,

        // Dispatches
        fetchImageVulnerabilities: PropTypes.func.isRequired,
        toggleDetailImageVulnPlane: PropTypes.func.isRequired,
        setDetailImageVuln: PropTypes.func.isRequired,

        intl: PropTypes.object.isRequired
    }

    constructor () {
        super();

        this.onCellClicked = this.onCellClicked.bind(this);
    }

    onCellClicked (res) {
        const { toggleDetailImageVulnPlane, setDetailImageVuln } = this.props;

        setDetailImageVuln(res.data);
        toggleDetailImageVulnPlane('partial');
    }

    render () {
        const {
            imageVulnerabilities,
            isImageVulnerabilitiesFetching,
            intl
        } = this.props;
        const { columnVulnerability, columnRiskScore, columnReleaseDate } = ImagesDetailVulnerabilitiesMessages;
        const vulnerabilitiesColumns = [
            {
                headerName: intl.formatMessage(columnVulnerability),
                field: 'cve',
                suppressSorting: true
            },
            {
                headerName: intl.formatMessage(columnRiskScore),
                field: 'cvss_score',
                suppressSorting: true
            },
            {
                headerName: intl.formatMessage(columnReleaseDate),
                field: 'published_date',
                customCellRenderer: (publishedDate) => {
                    return dateFormat(publishedDate, DATE_FORMAT_MONTH_DAY);
                },
                suppressSorting: true
            }
        ];

        const getCheckboxIcon = (props) => {
            const riskScore = props.data.cvss_score;
            // Using risk score in icon to get the level of vulnerability/icon color

            return (
                <VulnIconComponent
                    riskScore={riskScore} />
            );
        };

        const vulnerabilitiesTableProps = {
            allowSelection: true,
            rows: imageVulnerabilities.vulnerabilities,
            columns: vulnerabilitiesColumns,
            checkboxIconComponent: getCheckboxIcon,
            fetching: isImageVulnerabilitiesFetching,
            error: imageVulnerabilities.errorMessage,
            onCellClicked: this.onCellClicked
        };

        return (
            <React.Fragment>
                <Table {...vulnerabilitiesTableProps}/>
                <ImagesDetailVulnsDrilldownComponent />
            </React.Fragment>
        );
    }
}

export {
    ImagesDetailVulnsView
};
