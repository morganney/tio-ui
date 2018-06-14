import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    fetchDashboardData,
    fetchMyDashboards,
    fetchVisualizationData,
    resetVisualizationData,
    toggleMyDashboardsPlane,
    toggleDashboardSettingsPlane,
    editDashboardTitle,
    copyDashboard,
    deleteDashboard,
    fetchDashboardTemplates,
    openDashboardTemplatesPlane,
    fetchTargetGroups,
    copyDashboardWidget,
    filterDashboard,
    filterDashboardWidget,
    deleteDashboardWidget,
    resetCopyDashboard
} from '../actions';
import * as type from '../actions/types';

describe('Dashboards module actions', () => {
    it('Should create an action to retrieve a user\'s custom dashboards from the API', () => {
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.MY_DASHBOARDS_REQUEST,
                    type.MY_DASHBOARDS_SUCCESS,
                    type.MY_DASHBOARDS_ERROR
                ],
                request: '/dashboards/custom'
            }
        };

        expect(fetchMyDashboards()).toEqual(expectedAction);
    });

    it('Should create an action to fetch a custom dashboard\'s data from the API', () => {
        const uuid = 'someRandomDashboardUuid';
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.DASHBOARD_DATA_REQUEST,
                    type.DASHBOARD_DATA_SUCCESS,
                    type.DASHBOARD_DATA_ERROR
                ],
                request: `/dashboards/custom/${uuid}`
            }
        };

        expect(fetchDashboardData(uuid)).toEqual(expectedAction);
    });

    it('Should create an action to fetch a custom dashboard\'s visualization data from the API', () => {
        const uuids = [];
        const componentUrlArray = [];
        const maxComponents = 10;
        const randomNumber = Math.floor(Math.random() * Math.floor(maxComponents));

        for (let i = 0; i < randomNumber; i++) {
            uuids.push({
                dashboardUuid: `dashboardUuid-${i}`,
                componentUuid: `componentUuid-${i}`
            });
        }

        for (let j = uuids.length; j--;) {
            componentUrlArray.push(`/dashboards/custom/${uuids[j].dashboardUuid}/render/${uuids[j].componentUuid}`);
        }

        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.VISUALIZATION_DATA_REQUEST,
                    type.VISUALIZATION_DATA_SUCCESS,
                    type.VISUALIZATION_DATA_ERROR
                ],
                request: componentUrlArray
            }
        };

        expect(fetchVisualizationData(uuids)).toEqual(expectedAction);
    });

    it('Should create an action to reset the visualization data', () => {
        const expectedAction = {
            type: type.VISUALIZATION_DATA_RESET
        };
        const receivedAction = resetVisualizationData();

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to toggle the My Dashboards plane', (displayState = 'closed') => {
        const expectedAction = {
            type: type.TOGGLE_MY_DASHBOARDS_PLANE,
            payload: displayState
        };
        const receivedAction = toggleMyDashboardsPlane('partial');

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to send an updated dashboard title to the API', () => {
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.EDIT_DASHBOARD_TITLE_REQUEST,
                    type.EDIT_DASHBOARD_TITLE_SUCCESS,
                    type.EDIT_DASHBOARD_TITLE_ERROR
                ],
                request: {
                    url: '/dashboards/custom/dashboardUuid',
                    method: 'PATCH',
                    body: {
                        name: 'Test Dashboard Title'
                    }
                }
            }
        };
        const receivedAction = editDashboardTitle('dashboardUuid', 'My New Dashboard Title');

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to copy a given dashboard to the API', () => {
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.COPY_DASHBOARD_REQUEST,
                    type.COPY_DASHBOARD_SUCCESS,
                    type.COPY_DASHBOARD_ERROR
                ],
                request: {
                    url: '/dashboards/custom/dashboardUuid/duplicate',
                    method: 'POST'
                }
            }
        };
        const receivedAction = copyDashboard('dashboardUuid');

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to delete a dashboard to the API', () => {
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.DELETE_DASHBOARD_REQUEST,
                    type.DELETE_DASHBOARD_SUCCESS,
                    type.DELETE_DASHBOARD_ERROR
                ],
                request: {
                    url: '/dashboards/custom/dashboardUuid',
                    method: 'DELETE'
                }
            }
        };
        const receivedAction = deleteDashboard('dashboardUuid');

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to toggle the Dashboard Settings plane', (displayState = 'closed') => {
        const expectedAction = {
            type: type.TOGGLE_DASHBOARD_SETTINGS_PLANE,
            payload: displayState
        };
        const receivedAction = toggleDashboardSettingsPlane('partial');

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to fetch all dashboard templates', () => {
        const receivedAction = fetchDashboardTemplates();
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.DASHBOARD_TEMPLATES_REQUEST,
                    type.DASHBOARD_TEMPLATES_SUCCESS,
                    type.DASHBOARD_TEMPLATES_ERROR
                ],
                request: `/dashboards/templates?categoryId=all`
            }
        };

        expect(receivedAction).toEqual(expectedAction);
    });

    it('Should create an action to open dashboard templates plane', () => {
        const receivedAction = openDashboardTemplatesPlane(true);
        const expectedAction = {
            type: type.OPEN_DASHBOARD_TEMPLATES_PLANE,
            payload: true
        };

        expect(receivedAction).toEqual(expectedAction);
    });

    it('Should create an action to fetch all target groups', () => {
        const receivedAction = fetchTargetGroups();
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.TARGET_GROUPS_REQUEST,
                    type.TARGET_GROUPS_SUCCESS,
                    type.TARGET_GROUPS_ERROR
                ],
                request: '/target-groups/all'
            }
        };

        expect(receivedAction).toEqual(expectedAction);
    });

    it('Should create an action to copy a given dashboard widget to the API', () => {
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.COPY_DASHBOARD_WIDGET_REQUEST,
                    type.COPY_DASHBOARD_WIDGET_SUCCESS,
                    type.COPY_DASHBOARD_WIDGET_ERROR
                ],
                request: {
                    url: '/dashboards/custom/dashboardUuid/component/widgetUuid/duplicate',
                    method: 'POST'
                }
            }
        };
        const receivedAction = copyDashboardWidget('dashboardUuid', 'widgetUuid');

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to delete a given dashboard widget to the API', () => {
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.DELETE_DASHBOARD_WIDGET_REQUEST,
                    type.DELETE_DASHBOARD_WIDGET_SUCCESS,
                    type.DELETE_DASHBOARD_WIDGET_ERROR
                ],
                request: {
                    url: '/dashboards/custom/dashboardUuid/component/widgetUuid',
                    method: 'DELETE'
                }
            }
        };
        const receivedAction = deleteDashboardWidget('dashboardUuid', 'widgetUuid');

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to apply selected filters for a dashboard to the API', () => {
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.FILTER_DASHBOARD_REQUEST,
                    type.FILTER_DASHBOARD_SUCCESS,
                    type.FILTER_DASHBOARD_ERROR
                ],
                request: {
                    url: '/dashboards/custom/dashboardUuid',
                    method: 'PATCH',
                    body: {
                        components: [
                            {
                                uuid: 'test-uuid',
                                focusFilter: 'all'
                            }
                        ]
                    }
                }
            }
        };
        const receivedAction = filterDashboard('dashboardUuid');

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to apply selected filters for a specific dashboard component to the API', () => {
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    type.FILTER_DASHBOARD_WIDGET_REQUEST,
                    type.FILTER_DASHBOARD_WIDGET_SUCCESS,
                    type.FILTER_DASHBOARD_WIDGET_ERROR
                ],
                request: {
                    url: '/dashboards/custom/dashboardUuid/component/componentUuid',
                    method: 'PATCH',
                    body: {
                        uuid: 'test-component-uuid',
                        focusFilter: 'all'
                    }
                }
            }
        };
        const receivedAction = filterDashboardWidget('dashboardUuid', 'componentUuid');

        expect(receivedAction.type).toEqual(expectedAction.type);
    });

    it('Should create an action to reset the dashboard copied state', () => {
        const expectedAction = {
            type: type.RESET_COPY_DASHBOARD
        };
        const receivedAction = resetCopyDashboard();

        expect(receivedAction.type).toEqual(expectedAction.type);
    });
});
