import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ActionButton } from '@hivekit/button';
import { AddIcon, PoliciesIcon } from '@hivekit/icon';
import { Plane, PlaneFull, PlaneFullHeader } from '@hivekit/plane';
import { Table, Cell } from '@hivekit/table';

import { Patterns, constants as commonConstants } from 'tio-common';
// TODO: refactor this in CST-1763, after CI-21999 is resolved
import { BASE_PATH } from 'tio-container-security/modules/common/constants';
import {
    PolicyActionsComponent,
    NewPolicyComponent,
    EditPolicyComponent
} from 'tio-container-security/modules/policies/components';

const { PlaneFullPaddingWrapper } = Patterns.plane;

const PolicyTableView = ({
    // Redux Data fields
    policies,
    policiesFetching,
    policyTablePlaneDisplay,

    // React-router props
    match,
    history,

    // i18n messages
    policiesErrorMessage,
    addText,
    tableTitle,
    nameHeader,
    priorityHeader,
    repositoryHeader,
    typeHeader,
    actionHeader,
    operatorHeader,
    valueHeader,

    // Redux Dispatches
    fetchPolicies,
    setDrilldownPolicy,
    togglePolicyTablePlane,
    toggleNewPolicyPlane,
    toggleEditPolicyPlane
}) => {
    // TODO: move the business logic and render helpers block OUTSIDE of the component itself
    // Business logic
    const onPlaneChange = (res) => {
        if (res !== policyTablePlaneDisplay) {
            // Only dispatch the action, if the plane is changing to a NEW state
            // TODO: setTimeout is intended as temporary until a more formal routing transition solution is in place.
            togglePolicyTablePlane(res);
            setTimeout(() => {
                history.push(`${BASE_PATH}/dashboard`);
            }, commonConstants.planeTransitionInMs);
        }
    };
    const openNewPolicyForm = () => {
        // Close any nested siblings
        toggleEditPolicyPlane('closed');

        // Clear the existing drilldown policy
        setDrilldownPolicy(null);

        // Then open the plane, by pushing the proper route onto the react-router history
        history.push(`${match.path}/add`);
    };
    const openEditPolicyForm = (res) => {
        // Establish data that the Edit Policy form will need
        setDrilldownPolicy(res.data);

        // Close any nested siblings
        toggleNewPolicyPlane('closed');

        // Then open the plane
        toggleEditPolicyPlane('partial');
    };

    // Render helpers
    const renderHeader = () => {
        // JSX props
        const addButtonProps = {
            onClick: openNewPolicyForm,
            kind: 'dark',
            mr: 2
        };

        // JSX variables
        const headerIcon = (
            <PoliciesIcon />
        );
        const headerActions = [
            <ActionButton key={0} {...addButtonProps}>
                {addText}
                <AddIcon />
            </ActionButton>
        ];

        // JSX props
        const planeProps = {
            title: tableTitle,
            icon: headerIcon,
            actions: headerActions
        };

        return (
            <PlaneFullHeader {...planeProps} />
        );
    };
    const renderTable = () => {
        const policyColumns = [
            {
                headerName: nameHeader,
                field: 'name',
                suppressSorting: true
            },
            {
                headerName: priorityHeader,
                field: 'priority',
                suppressSorting: true
            },
            {
                headerName: repositoryHeader,
                field: 'repository.name',
                suppressSorting: true
            },
            {
                headerName: typeHeader,
                field: 'policyType',
                suppressSorting: true,
                cellStyle (type) {
                    if (type.value === 'cvss' || type.value === 'cve') {
                        return { textTransform: 'uppercase' };
                    }
                }
            },
            {
                headerName: actionHeader,
                field: 'action',
                suppressSorting: true,
                customCellRenderer (cellProps) {
                    const { value } = cellProps;

                    return (
                        <Cell {...cellProps}>
                            {value.replace(/_/g, ' ')}
                        </Cell>
                    );
                },
                cellStyle: { textTransform: 'capitalize' }
            },
            {
                headerName: operatorHeader,
                field: 'operator',
                suppressSorting: true,
                cellStyle: { textTransform: 'uppercase' }
            },
            {
                headerName: valueHeader,
                field: 'value',
                suppressSorting: true,
                cellStyle: { textTransform: 'capitalize' }
            },
            {
                // type is already implicitly set here by Table, but this makes the intent more explicit UI-side
                headerName: '',
                field: 'actions',
                type: 'densityToggle',
                width: 50,
                customCellRenderer: PolicyActionsComponent
            }
        ];
        const { items, pagination } = policies;

        // Massage policies data
        // TODO: move this to the action creator as a post-processing step
        if (Array.isArray(items)) {
            for (let i = items.length; i--;) {
                // CVEs come from the API as 'CVE-2018-0001,CVE-2018-0002'
                // We want more natural comma separation for display and form pre-fill.
                const currentPolicy = items[i];

                currentPolicy.value = currentPolicy.value.replace(',', ', ');
            }
        }

        const getCheckboxIcon = () => {
            return (
                <PoliciesIcon />
            );
        };

        const tableProps = {
            // Data
            rows: items,
            columns: policyColumns,

            // checkBox icons
            checkboxIconComponent: getCheckboxIcon,

            // States/events
            fetching: policiesFetching,
            error: policiesErrorMessage,
            onCellClicked: openEditPolicyForm,

            // Service-side pagination
            servicePagingAction: fetchPolicies,
            servicePagingResponse: pagination,

            // Extra config
            densityToggle: true
        };

        return (
            <React.Fragment>
                <PlaneFullPaddingWrapper>
                    <Table {...tableProps} />
                </PlaneFullPaddingWrapper>
                <Switch>
                    <Route path={`${match.path}/add`} component={NewPolicyComponent} />
                </Switch>
                <EditPolicyComponent />
            </React.Fragment>
        );
    };
    const renderFullContent = () => {
        return (
            <PlaneFull
                header={renderHeader()}
                content={renderTable()} />
        );
    };

    // JSX props
    const planeProps = {
        // Behavior/events
        onChange: onPlaneChange,

        // Appearance
        display: policyTablePlaneDisplay,
        full: renderFullContent
    };

    // JSX return
    return (
        <Plane {...planeProps} />
    );
};

PolicyTableView.propTypes = {
    // Redux Data fields
    policies: PropTypes.object.isRequired,
    policiesFetching: PropTypes.bool.isRequired,
    policyTablePlaneDisplay: PropTypes.string,

    // React-router props
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // i18n messages
    policiesErrorMessage: PropTypes.string,
    addText: PropTypes.string.isRequired,
    tableTitle: PropTypes.string.isRequired,
    nameHeader: PropTypes.string.isRequired,
    priorityHeader: PropTypes.string.isRequired,
    repositoryHeader: PropTypes.string.isRequired,
    typeHeader: PropTypes.string.isRequired,
    actionHeader: PropTypes.string.isRequired,
    operatorHeader: PropTypes.string.isRequired,
    valueHeader: PropTypes.string.isRequired,

    // Redux Dispatches
    fetchPolicies: PropTypes.func.isRequired,
    setDrilldownPolicy: PropTypes.func.isRequired,
    togglePolicyTablePlane: PropTypes.func.isRequired,
    toggleNewPolicyPlane: PropTypes.func.isRequired,
    toggleEditPolicyPlane: PropTypes.func.isRequired
};

export {
    PolicyTableView
};
