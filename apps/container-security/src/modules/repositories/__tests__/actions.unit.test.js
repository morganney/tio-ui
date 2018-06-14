import { STANDARD_API_ACTION } from 'tio-alloy';

import * as actions from '../actions';

// Unpack repository actions and types
const {
    fetchRepositories,
    setDrilldownRepository,
    fetchContainerImages
} = actions;
const {
    REPOSITORIES_REQUEST,
    REPOSITORIES_SUCCESS,
    REPOSITORIES_ERROR,
    SET_DRILLDOWN_REPOSITORY,
    CONTAINER_IMAGES_REQUEST,
    CONTAINER_IMAGES_SUCCESS,
    CONTAINER_IMAGES_ERROR
} = actions.types;

describe('Repositories Module Actions', () => {
    it('Should create an action to query repositories data from the API', () => {
        const defaultUrl = '/container-security/api/v2/repositories?offset=0&limit=50';
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    REPOSITORIES_REQUEST,
                    REPOSITORIES_SUCCESS,
                    REPOSITORIES_ERROR
                ],
                request: defaultUrl
            }
        };
        const receivedAction = fetchRepositories();

        expect(receivedAction).toEqual(expectedAction);
    });

    it('Should create an action object, to set the repository drilldown to the given payload object', () => {
        const samplePayload = {
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
        const expectedAction = {
            type: SET_DRILLDOWN_REPOSITORY,
            payload: samplePayload
        };
        const receivedAction = setDrilldownRepository(samplePayload);

        expect(receivedAction).toEqual(expectedAction);
    });

    it('Should create an action to query container images for a specific repository', () => {
        const sampleRepoName = 'ubuntu';
        const sampleFilters = {
            offset: 0,
            limit: 50
        };
        let url = '/container-security/api/v2/images';
        url = `${url}?repo=${sampleRepoName}&offset=${sampleFilters.offset}&limit=${sampleFilters.limit}`;

        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    CONTAINER_IMAGES_REQUEST,
                    CONTAINER_IMAGES_SUCCESS,
                    CONTAINER_IMAGES_ERROR
                ],
                request: url
            }
        };
        const receivedAction = fetchContainerImages(sampleRepoName, sampleFilters);

        expect(receivedAction).toEqual(expectedAction);
    });
});
