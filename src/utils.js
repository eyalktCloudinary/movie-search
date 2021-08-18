import * as getApiData from './apiData';

const apiData = getApiData.default();

export function parseParams(params) {
    if (!params) return null;
    let queryArr = [];
    for (let p in params) {
        queryArr.push(p + '=' + params[p])
    }
    queryArr.push('apikey=' + apiData.apikey)
    return queryArr.join('&');
}

export function generateEndpoint(params) {
    if (!params) return null;
    return apiData.baseEndpoint + parseParams(params);
}

export function paramsFromEndpoint(endpoint) {
    console.log("parsing endpoint", endpoint);
    if (!endpoint) return null;
    const params = {};
    endpoint.split('?')[1]
        .split('&').forEach(p => {
            const [key, value] = p.split('=');
            if (key !== 'apikey') params[key] = value;
        });
    return params;
}
