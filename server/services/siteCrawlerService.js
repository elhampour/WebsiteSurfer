import IsomorphicFetch from 'isomorphic-fetch';

let req = function* (ip, port, url) {
    let body = {
        ProxyIp: ip,
        ProxyPort: port,
        Url: url
    };
    let options = {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let raw;
    try {
        raw = yield IsomorphicFetch('http://localhost:3826/api/proxy/get', options);
    }
    catch (ex) {
        throw (ex);
    }

    let ssss = yield raw.json();
    return ssss;
};

export default function* (proxyList, siteUrl) {
    let url = `http://website.informer.com/${siteUrl}`;
    let index = 0;
    let response = '';
    let found = false;
    while (true) {
        let result = yield req(proxyList[index].url, proxyList[index].port, url);
        if (result.success) {
            response = result.response;
            found = true;
            break;
        }
        if (result.tryAgain) {
            continue;
        }
        break;
    }
    if (!found) {
        throw ('no proxy was good.');
    }
    return response;
};