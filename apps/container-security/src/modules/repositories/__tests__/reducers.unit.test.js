import * as actions from '../actions';
import * as reducers from '../reducers';

// Unpack needed actions types and reducers
const {
    TOGGLE_REPOSITORY_TABLE_PLANE,
    REPOSITORIES_REQUEST,
    SET_DRILLDOWN_REPOSITORY,
    CONTAINER_IMAGES_REQUEST,
    CONTAINER_IMAGES_SUCCESS,
    CONTAINER_IMAGES_ERROR
} = actions.types;
const {
    repositoryTablePlaneDisplay,
    repositoriesFetching,
    drilldownRepository,
    containerImagesError,
    containerImagesFetching,
    containerImages
} = reducers;

describe('Container Security - Repositories Module Reducers', () => {
    it('should update the repository table plane state', () => {
        const expectedState = 'full';
        const actualState = repositoryTablePlaneDisplay(null, {
            type: TOGGLE_REPOSITORY_TABLE_PLANE,
            payload: 'full'
        });

        expect(actualState).toEqual(expectedState);
    });

    it('should set the repositoriesFetching flag to true during an API request', () => {
        const expectedState = true;
        const actualState = repositoriesFetching(false, {
            type: REPOSITORIES_REQUEST
        });

        expect(actualState).toEqual(expectedState);
    });

    it('should set the drilldownRepository state to the given object', () => {
        const expectedState = {
            id: '2820815431329571669',
            name: 'aRepositoryName',
            description: 'aRepositoryDescription',
            imagesCount: 0,
            labelsCount: 0,
            vulnerabilitiesCount: 0,
            malwareCount: 0,
            pullCount: 0,
            pushCount: 0,
            totalBytes: 0
        };
        const actualState = drilldownRepository(null, {
            type: SET_DRILLDOWN_REPOSITORY,
            payload: expectedState
        });

        expect(actualState).toEqual(expectedState);
    });

    it('should set containerImagesError to false when the request succeeds', () => {
        const expectedState = false;
        const actualState = containerImagesError(null, {
            type: CONTAINER_IMAGES_SUCCESS
        });

        expect(actualState).toEqual(expectedState);
    });

    it('should set containerImagesError to an error key when the request fails', () => {
        const expectedState = 'genericApiError';
        const actualState = containerImagesError(null, {
            type: CONTAINER_IMAGES_ERROR
        });

        expect(actualState).toEqual(expectedState);
    });

    it('should set containerImagesFetching to true when the request is in progress', () => {
        const expectedState = true;
        const actualState = containerImagesFetching(null, {
            type: CONTAINER_IMAGES_REQUEST
        });

        expect(actualState).toEqual(expectedState);
    });

    it('should set containerImagesFetching to false when the request finishes (fails or succeeds)', () => {
        const expectedState = false;
        let actualState = containerImagesFetching(null, {
            type: CONTAINER_IMAGES_SUCCESS
        });

        expect(actualState).toEqual(expectedState);

        actualState = containerImagesFetching(null, {
            type: CONTAINER_IMAGES_ERROR
        });

        expect(actualState).toEqual(expectedState);
    });

    it('should set containerImages to the response payload, when the request succeeds', () => {
        const expectedState = {
            items: ['foo', 'bar', 'baz'],
            pagination: {
                offset: 0,
                limit: 50
            }
        };
        const sampleResponse = {
            items: ['foo', 'bar', 'baz'],
            offset: 0,
            limit: 50
        };
        const actualState = containerImages(null, {
            type: CONTAINER_IMAGES_SUCCESS,
            payload: sampleResponse
        });

        expect(actualState).toEqual(expectedState);
    });
});
