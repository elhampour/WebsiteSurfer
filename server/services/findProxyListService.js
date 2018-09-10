import MakeRequestService from './makeRequestService';
import cheerio from 'cheerio';

export default function* () {
    let url = `https://free-proxy-list.net`;
    let html = yield MakeRequestService(url);
    let tbody = cheerio.load(html)('tbody')[0];
    let trs = cheerio.load(tbody)('tr');
    let indexLength = trs.length <= 10 ? trs.length : 10;
    let proxyList = [];
    for (let index = 0; index < indexLength; index++) {
        let ipNode = cheerio.load(trs[index])('td')[0];
        let portNode = cheerio.load(trs[index])('td')[1];
        let ip = cheerio.load(ipNode).text();
        let port = cheerio.load(portNode).text();
        let proxyUrl = `${ip}:${port}`;
        proxyList.push({
            url: ip,
            port: port,
            proxyUrl: proxyUrl
        });
    }
    return proxyList;
};