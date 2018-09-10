import MakeRequestService from './makeRequestService';
var request = require('request-promise');

export default function* (proxyList) {
    process.env.HTTP_PROXY = 'http://' + proxyList[0].proxyUrl;
    let url = `http://localhost:3826/api/email`;
    let options = {
        url: url,
        method: 'GET',
        headers:{
            Connection: 'keep-alive'
        }
    };

    let re = yield request(options);
    debugger;
    return re;
};