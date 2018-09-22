import cheerio from 'cheerio';
import SiteCrawlerService from './siteCrawlerService';

export default function* (proxyList, emailsAndPopSites) {
    for (let index2 = 0; index2 < emailsAndPopSites.emails.length; index2++) {
        let url = `email/${emailsAndPopSites.emails[index2].address}`;
        let siteHtml = yield SiteCrawlerService(proxyList, url);
        let fullHtml = cheerio.load(siteHtml);
        let sdsds = fullHtml('.left-sites-e');
        let emailSites = [];
        for (let index3 = 0; index3 < sdsds.length; index3++) {
            let dasdasdsa = cheerio.load(sdsds[index3])('a');
            let vfvf = dasdasdsa.text();
            emailSites.push(vfvf);
        }
        emailsAndPopSites.emails[index2].sites = emailSites;
    }
    return emailsAndPopSites;
};