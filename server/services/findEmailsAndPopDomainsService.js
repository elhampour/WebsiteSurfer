import cheerio from 'cheerio';
import SiteCrawlerService from './siteCrawlerService';

export default function* (proxyList, url) {
    let compnayInfoHtml = yield SiteCrawlerService(proxyList, url);
    let fullHtml = cheerio.load(compnayInfoHtml);
    let htsadas = fullHtml(".b-content-btm");
    let childrent = htsadas.children();
    let emails = [];
    let popularSites = [];
    for (let index2 = 0; index2 < childrent.length; index2++) {
        let ssss = childrent[index2];
        let type = ssss.type;
        let name = ssss.name;
        if (type == "tag" && name == 'a') {
            let fullHtdmal = cheerio.load(ssss);
            let aaaaa = fullHtdmal('a');
            if (aaaaa.length !== 0) {
                let email = aaaaa.text();
                emails.push({
                    address: email,
                    sites: []
                });
            }
        }
        if (type == "tag" && name == 'ul') {
            let dasdsa = cheerio.load(ssss);
            let ssdsdsd = dasdsa("a");
            for (let index3 = 0; index3 < ssdsdsd.length; index3++) {
                let sxsaxsax = cheerio.load(ssdsdsd[index3])('a');
                let sdss = sxsaxsax.text();
                popularSites.push(sdss);
            }
        }
    }

    return {
        emails: emails,
        popularSites: popularSites
    };
};