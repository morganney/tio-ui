import isEqual from 'lodash/isEqual';

const getInitialFilterFormValues = (dashboardData, activeComponent = null) => {
    const assetOptions = [
        {
            value: 'all',
            label: 'All Assets'
        },
        {
            value: 'targetList',
            label: 'Target Group'
        },
        {
            value: 'hostAddress',
            label: 'Custom'
        }
    ];
    const initialValues = {
        selectAssets: {
            value: 'all',
            label: 'All Assets'
        },
        targetGroups: [],
        customTarget: '',
        allIdenticalFocus: true
    };
    let focusFilter = 'all';

    const firstComponentFocus = dashboardData.components[0].focusFilter;

    for (let i = dashboardData.components.length; i--;) {
        if (!isEqual(firstComponentFocus, dashboardData.components[i].focusFilter)) {
            initialValues.allIdenticalFocus = false;

            break;
        }
    }

    if (initialValues.allIdenticalFocus) {
        focusFilter = firstComponentFocus;
    } else if (activeComponent) {
        for (let i = dashboardData.components.length; i--;) {
            const component = dashboardData.components[i];

            if (component.uuid === activeComponent) {
                focusFilter = component.focusFilter;
            }
        }
    }

    for (let i = assetOptions.length; i--;) {
        const assetOption = assetOptions[i];

        if (typeof focusFilter === 'object') {
            if (Object.keys(focusFilter)[0] === assetOption.value) {
                initialValues.selectAssets = {
                    value: assetOption.value,
                    label: assetOption.label
                };
            }
        }
    }

    switch (initialValues.selectAssets.value) {
        case 'targetList':
            initialValues.targetGroups = focusFilter.targetList;
            break;
        case 'hostAddress':
            initialValues.customTarget = focusFilter.hostAddress;
            break;
        default:
            initialValues.targetGroups = [];
            initialValues.customTarget = '';
            break;
    }

    return initialValues;
};

export {
    getInitialFilterFormValues
};
