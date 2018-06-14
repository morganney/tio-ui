import { PRODUCT_DEFAULT_DASHBOARDS } from '../../../constants';

const getMyDashboardsList = (listData, defaultDashboard) => {
    const list = listData.map((data) => {
        const listItem = {
            id: data.uuid,
            label: data.name,
            static: true,
            iconName: 'VulnerabilitiesIcon'
        };

        if (listItem.id === defaultDashboard) {
            listItem.bookmarked = true;
        }

        return listItem;
    });

    return list;
};

const getMyProductDefaultDashboardsList = (activeFeatures, intl) => {
    const productDefaultList = [];

    for (let x = 0; x < PRODUCT_DEFAULT_DASHBOARDS.length; x++) {
        const dashboard = PRODUCT_DEFAULT_DASHBOARDS[x];

        if (activeFeatures[dashboard.FEATURE_FLAG]) {
            productDefaultList.push({
                label: intl.formatMessage(dashboard.TITLE),
                static: true,
                iconName: 'VulnerabilitiesIcon',
                readOnly: true,
                link: dashboard.URL
            });
        }
    }

    // Add divider to end
    productDefaultList[productDefaultList.length - 1].divider = true;

    return productDefaultList;
};

export {
    getMyDashboardsList,
    getMyProductDefaultDashboardsList
};
