import * as reducer from '../reducers';
import * as type from '../actions/types';

const dummyStore = {};

describe('Dashboards module reducers', () => {
    describe('Dashboard data reducer', () => {
        const initialState = {};

        it('Should return initial state', () => {
            expect(reducer.dashboardData(dummyStore, {})).toEqual(initialState);
        });

        it('Should handle DASHBOARD_DATA_SUCCESS', () => {
            const action = {
                type: type.DASHBOARD_DATA_SUCCESS,
                payload: {}
            };
            const expectedState = {};

            expect(reducer.dashboardData(initialState, action)).toEqual(expectedState);
        });

        it('Should handle DASHBOARD_DATA_ERROR', () => {
            const action = {
                type: type.DASHBOARD_DATA_ERROR
            };
            const expectedState = {
                errorMessage: 'There was an error in processing your request.'
            };

            expect(reducer.dashboardData(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Dashboards reducer', () => {
        const initialState = [];

        it('Should return initial state', () => {
            expect(reducer.dashboards(dummyStore.state, {})).toEqual(initialState);
        });

        it('Should handle MY_DASHBOARDS_SUCCESS', () => {
            const action = {
                type: type.MY_DASHBOARDS_SUCCESS,
                payload: {
                    dashboards: []
                }
            };
            const expectedState = [];

            expect(reducer.dashboards(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Visualization data reducer', () => {
        const initialState = {
            data: []
        };

        it('Should return initial state', () => {
            expect(reducer.dashboards(initialState, {})).toEqual({ data: [] });
        });

        it('Should handle VISUALIZATION_DATA_SUCCESS', () => {
            const action = {
                type: type.VISUALIZATION_DATA_SUCCESS,
                payload: []
            };
            const expectedState = {
                data: []
            };

            expect(reducer.visualizationData(initialState, action)).toEqual(expectedState);
        });

        it('Should handle VISUALIZATION_DATA_RESET', () => {
            const action = {
                type: type.VISUALIZATION_DATA_RESET
            };
            const expectedState = {
                data: []
            };

            expect(reducer.visualizationData(initialState, action)).toEqual(expectedState);
        });

        it('Should handle VISUALIZATION_DATA_ERROR', () => {
            const action = {
                type: type.VISUALIZATION_DATA_ERROR
            };
            const expectedState = {
                data: []
            };

            expect(reducer.visualizationData(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Fetching visualization Data reducer', () => {
        const initialState = false;

        it('Should return initial state', () => {
            expect(reducer.dashboards(initialState, {})).toEqual(false);
        });

        it('Should handle VISUALIZATION_DATA_REQUEST', () => {
            const action = {
                type: type.VISUALIZATION_DATA_REQUEST
            };
            const expectedState = true;

            expect(reducer.fetchingVisualizationData(initialState, action)).toEqual(expectedState);
        });

        it('Should handle VISUALIZATION_DATA_SUCCESS', () => {
            const action = {
                type: type.VISUALIZATION_DATA_SUCCESS
            };
            const expectedState = false;

            expect(reducer.fetchingVisualizationData(initialState, action)).toEqual(expectedState);
        });

        it('Should handle VISUALIZATION_DATA_ERROR', () => {
            const action = {
                type: type.VISUALIZATION_DATA_ERROR
            };
            const expectedState = false;

            expect(reducer.fetchingVisualizationData(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Fetching My Dashboards reducer', () => {
        const initialState = false;

        it('Should return initial state', () => {
            expect(reducer.dashboards(initialState, {})).toEqual(false);
        });

        it('Should handle MY_DASHBOARDS_REQUEST', () => {
            const action = {
                type: type.MY_DASHBOARDS_REQUEST
            };
            const expectedState = true;

            expect(reducer.fetchingMyDashboards(initialState, action)).toEqual(expectedState);
        });

        it('Should handle MY_DASHBOARDS_SUCCESS', () => {
            const action = {
                type: type.MY_DASHBOARDS_SUCCESS
            };
            const expectedState = false;

            expect(reducer.fetchingMyDashboards(initialState, action)).toEqual(expectedState);
        });

        it('Should handle MY_DASHBOARDS_ERROR', () => {
            const action = {
                type: type.MY_DASHBOARDS_ERROR
            };
            const expectedState = false;

            expect(reducer.fetchingMyDashboards(initialState, action)).toEqual(expectedState);
        });
    });

    describe('My Dashboards plane display reducer', () => {
        const initialState = 'closed';

        it('Should return initial state', () => {
            expect(reducer.dashboards(initialState, {})).toEqual('closed');
        });

        it('Should handle TOGGLE_MY_DASHBOARDS_PLANE', () => {
            const action = {
                type: type.TOGGLE_MY_DASHBOARDS_PLANE,
                payload: 'partial'
            };
            const expectedState = 'partial';

            expect(reducer.myDashboardsPlaneDisplay(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Fetching dashboard templates reducer', () => {
        const initialState = false;
        const result = reducer.dashboardTemplates(initialState, {});
        const expected = false;

        it('Should return initial state', () => {
            expect(result).toEqual(expected);
        });
    });

    describe('Dashboard templates plane opened reducer', () => {
        const initialState = false;
        const action = {
            type: type.OPEN_DASHBOARD_TEMPLATES_PLANE,
            payload: true
        };
        const result = reducer.dashboardTemplatesPlaneDisplayOpened(initialState, action);
        const expected = true;

        it('Should return correct opened state', () => {
            expect(result).toEqual(expected);
        });
    });

    describe('Dashboard settings plane display reducer', () => {
        const initialState = 'closed';

        it('Should return initial state', () => {
            expect(reducer.dashboards(initialState, {})).toEqual('closed');
        });

        it('Should handle TOGGLE_DASHBOARD_SETTINGS_PLANE', () => {
            const action = {
                type: type.TOGGLE_DASHBOARD_SETTINGS_PLANE,
                payload: 'partial'
            };
            const expectedState = 'partial';

            expect(reducer.dashboardSettingsPlaneDisplay(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Edit dashboard title reducer', () => {
        const initialState = {
            success: false,
            data: {}
        };

        it('Should return initial state', () => {
            expect(reducer.dashboardTitleEdited(initialState, {})).toEqual(initialState);
        });

        it('Should handle EDIT_DASHBOARD_TITLE_SUCCESS', () => {
            const action = {
                type: type.EDIT_DASHBOARD_TITLE_SUCCESS
            };
            const expectedState = {
                success: true,
                data: action.payload
            };

            expect(reducer.dashboardTitleEdited(initialState, action)).toEqual(expectedState);
        });

        it('Should handle EDIT_DASHBOARD_TITLE_ERROR', () => {
            const action = {
                type: type.EDIT_DASHBOARD_TITLE_ERROR
            };
            const expectedState = {
                success: false,
                data: action.payload
            };

            expect(reducer.dashboardTitleEdited(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Copy dashboard reducer', () => {
        const initialState = {
            success: false,
            data: {}
        };

        it('Should return initial state', () => {
            expect(reducer.dashboardCopied(initialState, {})).toEqual(initialState);
        });

        it('Should handle COPY_DASHBOARD_SUCCESS', () => {
            const action = {
                type: type.COPY_DASHBOARD_SUCCESS
            };
            const expectedState = {
                success: true,
                data: action.payload
            };

            expect(reducer.dashboardCopied(initialState, action)).toEqual(expectedState);
        });

        it('Should handle COPY_DASHBOARD_ERROR', () => {
            const action = {
                type: type.COPY_DASHBOARD_ERROR
            };
            const expectedState = {
                success: false,
                data: action.payload
            };

            expect(reducer.dashboardCopied(initialState, action)).toEqual(expectedState);
        });

        it('Should handle RESET_COPY_DASHBOARD', () => {
            const action = {
                type: type.RESET_COPY_DASHBOARD
            };
            const expectedState = {
                success: false,
                data: {}
            };

            expect(reducer.fetchingVisualizationData(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Delete dashboard reducer', () => {
        const initialState = {
            success: false,
            data: {}
        };

        it('Should return initial state', () => {
            expect(reducer.dashboardDeleted(initialState, {})).toEqual(initialState);
        });

        it('Should handle DELETE_DASHBOARD_SUCCESS', () => {
            const action = {
                type: type.DELETE_DASHBOARD_SUCCESS
            };
            const expectedState = {
                success: true,
                data: action.payload
            };

            expect(reducer.dashboardDeleted(initialState, action)).toEqual(expectedState);
        });

        it('Should handle DELETE_DASHBOARD_ERROR', () => {
            const action = {
                type: type.DELETE_DASHBOARD_ERROR
            };
            const expectedState = {
                success: false,
                data: action.payload
            };

            expect(reducer.dashboardDeleted(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Copy dashboard widget reducer', () => {
        const initialState = {
            success: false,
            data: {}
        };

        it('Should return initial state', () => {
            expect(reducer.dashboardWidgetCopied(initialState, {})).toEqual(initialState);
        });

        it('Should handle COPY_DASHBOARD_WIDGET_SUCCESS', () => {
            const action = {
                type: type.COPY_DASHBOARD_WIDGET_SUCCESS
            };
            const expectedState = {
                success: true,
                data: action.payload
            };

            expect(reducer.dashboardWidgetCopied(initialState, action)).toEqual(expectedState);
        });

        it('Should handle COPY_DASHBOARD_WIDGET_ERROR', () => {
            const action = {
                type: type.COPY_DASHBOARD_WIDGET_ERROR
            };
            const expectedState = {
                success: false,
                data: action.payload
            };

            expect(reducer.dashboardWidgetCopied(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Delete dashboard widget reducer', () => {
        const initialState = {
            success: false,
            data: {}
        };

        it('Should return initial state', () => {
            expect(reducer.dashboardWidgetDeleted(initialState, {})).toEqual(initialState);
        });

        it('Should handle DELETE_DASHBOARD_WIDGET_SUCCESS', () => {
            const action = {
                type: type.DELETE_DASHBOARD_WIDGET_SUCCESS
            };
            const expectedState = {
                success: true,
                data: action.payload
            };

            expect(reducer.dashboardWidgetDeleted(initialState, action)).toEqual(expectedState);
        });

        it('Should handle DELETE_DASHBOARD_WIDGET_ERROR', () => {
            const action = {
                type: type.DELETE_DASHBOARD_WIDGET_ERROR
            };
            const expectedState = {
                success: false,
                data: action.payload
            };

            expect(reducer.dashboardWidgetDeleted(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Dashboard settings filter reducer', () => {
        const initialState = {
            success: false,
            data: {}
        };

        it('Should handle FILTER_DASHBOARD_SUCCESS', () => {
            const action = {
                type: type.FILTER_DASHBOARD_SUCCESS
            };
            const expectedState = {
                success: true,
                data: action.payload
            };

            expect(reducer.dashboardFiltered(initialState, action)).toEqual(expectedState);
        });

        it('Should handle FILTER_DASHBOARD_ERROR', () => {
            const action = {
                type: type.FILTER_DASHBOARD_ERROR
            };
            const expectedState = {
                success: false,
                data: action.payload
            };

            expect(reducer.dashboardFiltered(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Dashboard component settings filter reducer', () => {
        const initialState = {
            success: false,
            data: {}
        };

        it('Should handle FILTER_DASHBOARD_WIDGET_SUCCESS', () => {
            const action = {
                type: type.FILTER_DASHBOARD_WIDGET_SUCCESS
            };
            const expectedState = {
                success: true,
                data: action.payload
            };

            expect(reducer.dashboardWidgetFiltered(initialState, action)).toEqual(expectedState);
        });

        it('Should handle FILTER_DASHBOARD_WIDGET_ERROR', () => {
            const action = {
                type: type.FILTER_DASHBOARD_WIDGET_ERROR
            };
            const expectedState = {
                success: false,
                data: action.payload
            };

            expect(reducer.dashboardWidgetFiltered(initialState, action)).toEqual(expectedState);
        });
    });
});
