import MakeRequestService from './makeRequestService';
var request = require('request-promise');

export default function* (proxyList, siteUrl) {
    let url = `http://website.informer.com/${siteUrl}`;
    let options = {
        url: url,
        method: 'GET',
    };
    request.defaults({
        proxy: proxyList[0].proxyUrl
    });

    let re = yield request(options);
    return re;
};