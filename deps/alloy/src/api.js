import Alloy from './';

let defaultHeaders = {
    'Content-Type': 'application/json'
};

const internalFlags = {};

const buildHeaders = (customHeaders) => {
    let headersObj = defaultHeaders;

    if (customHeaders) {
        headersObj = { ...defaultHeaders, ...customHeaders };
    }

    return new Headers(headersObj);
};

const prepUrl = (url, options = {}) => {
    if (!url || typeof url !== 'string') {
        return;
    }

    const { mockFeatureTags, runMock, apiPrefix, mockPrefix } = internalFlags;
    const { routeFeatureTag, routeMockOverride } = options;
    let routeOfMockedFeature = false;
    let endpointUrl = url;

    if (mockFeatureTags && mockFeatureTags.indexOf(routeFeatureTag) > -1) {
        routeOfMockedFeature = true;
    }

    if (endpointUrl.charAt(0) === '/') {
        endpointUrl = endpointUrl.slice(1);
    }

    if (runMock || routeMockOverride || routeOfMockedFeature) {
        endpointUrl = `${mockPrefix}${endpointUrl}`;
    }

    if (apiPrefix) {
        endpointUrl = `${apiPrefix}${endpointUrl}`;
    }

    if (endpointUrl.charAt(0) !== '/') {
        endpointUrl = `/${endpointUrl}`;
    }

    return endpointUrl;
};

const Api = {
    prependUrl: (url, options = {}) => {
        return prepUrl(url, options);
    },
    configure: (options) => {
        const {
            headers,
            apiPrefix,
            mockPrefix,
            runMock,
            mockFeatures,
            clearMockFeatures
        } = options;

        if (headers && typeof headers === 'object') {
            defaultHeaders = { ...defaultHeaders, ...headers };
        }

        if (apiPrefix) {
            internalFlags.apiPrefix = apiPrefix;
        }

        if (mockPrefix) {
            internalFlags.mockPrefix = mockPrefix;
        }

        if (runMock) {
            internalFlags.runMock = true;
        }

        if (mockFeatures) {
            internalFlags.mockFeatureTags = mockFeatures;
        }

        if (clearMockFeatures) {
            delete internalFlags.mockFeatureTags;
        }
    },
    fetch: async (endpoints = []) => {
        const requests = [];
        const data = [];
        const notModified = 304;
        let configs = endpoints;
        let responses = [];
        let jsons = [];
        let responseJsons = [];

        if (!Array.isArray(endpoints)) {
            configs = [endpoints];
        }

        configs.forEach((endpoint) => {
            const headers = buildHeaders();
            let request = { method: 'GET' };
            let url = prepUrl(endpoint);

            if (typeof endpoint === 'object') {
                if (endpoint.body && typeof endpoint.body !== 'string') {
                    endpoint.body = JSON.stringify(endpoint.body);
                }

                if (Array.isArray(endpoint.headers)) {
                    endpoint.headers.forEach(({ name, value }) => {
                        headers.append(name, value);
                    });
                }

                request = endpoint;
                url = prepUrl(endpoint.url, {
                    routeMockOverride: endpoint.mock,
                    routeFeatureTag: endpoint.tag
                });
            }

            request.headers = headers;
            request.credentials = 'include';
            requests.push(fetch(url, request));
        });

        responses = await Promise.all(requests);

        jsons = responses.map((response, idx) => {
            const config = configs[idx];

            // Some routes return no body, e.g. /session/password-reset
            if (config.ignoreResponseBody) {
                let errorMessage = 'Request failed.';

                if (response.ok || status === notModified) {
                    // Resolve as empty object, so the rest middleware considers this a valid response
                    return Promise.resolve({});
                }

                if (response.statusText) {
                    errorMessage = `${status}: ${response.statusText}`;
                }

                Alloy.Bus.emit('apiError', errorMessage);

                return Promise.reject(new Error(errorMessage));
            }

            return response.json();
        });

        responseJsons = await Promise.all(jsons);
        responseJsons.forEach((json, idx) => {
            const response = responses[idx];
            const status = response.status;

            if (response.ok || status === notModified) {
                data.push(json);
            } else {
                let errmsg = `${status}: ${response.statusText}`;

                if (json.error) {
                    errmsg = JSON.stringify(json);
                }

                Alloy.Bus.emit('apiError', errmsg);

                data.push(Promise.reject(new Error(errmsg)));
            }
        });

        if (configs.length === 1) {
            return data[0];
        }

        return data;
    },
    getHeaders: () => {
        return buildHeaders();
    }
};

export default Api;
