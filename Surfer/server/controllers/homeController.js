import readXlsxFile from 'read-excel-file/node';
import SiteCrawlerService from '../services/siteCrawlerService';
import FindOwnerService from '../services/findOwnerService';
import FindSiteTitleService from '../services/findSiteTitleService';
import FindEmailsAndPopDomainsService from '../services/findEmailsAndPopDomainsService';
import AttachSitesToEmailsService from '../services/attachSitesToEmailsService';
import GetSites from '../services/getSites';
import WiteToResult from '../services/witeToResult';
import EnsureResultFileService from '../services/ensureResultFileService';
import FindProxyListService from '../services/findProxyListService';
import TestProxyService from '../services/testProxyService';
import fs from 'fs-extra';

export default function* (req, res) {

    let start = req.query.start;
    let end = req.query.end;

    if (typeof (start) === "undefined" || typeof (end) === "undefined") {
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, message: 'lack of entries' }));
        return;
    }

    // let proxyList = yield FindProxyListService();

    let proxyList = [{
        url: '142.93.182.13',
        port: '8080'
    }];

    let path222 = '../files/entry.xlsx';
    let rows = yield readXlsxFile(path222);
    let resultPath = '../files/result.xlsx';

    let currentIndex = 0;

    let differentFiles = true;

    if (!differentFiles) {
        yield EnsureResultFileService(resultPath);
    }

    for (let index = start; index < end; index++) {
        let siteUrl = rows[index][0];
        let resultPathdiff = `../files/${siteUrl}.xlsx`;
        let cdcdcd = yield fs.pathExists(resultPathdiff);
        if (differentFiles) {
            if (cdcdcd) {
                continue;
            }
        }
        let siteHtml = yield SiteCrawlerService(proxyList, siteUrl);
        // let siteTitle = FindSiteTitleService.find(siteHtml);
        let owner = FindOwnerService.find(siteHtml);
        if (owner.name.length == 0) {
            yield EnsureResultFileService(resultPathdiff);
            continue;
        }
        let emailsAndPopSites = yield FindEmailsAndPopDomainsService(proxyList, owner.url);
        emailsAndPopSites = yield AttachSitesToEmailsService(proxyList, emailsAndPopSites);
        let thisSites = GetSites.get(siteUrl, emailsAndPopSites);
        if (differentFiles) {
            yield EnsureResultFileService(resultPathdiff);
            yield WiteToResult(resultPathdiff, thisSites, 0);
        } else {
            yield WiteToResult(resultPath, thisSites, currentIndex);
            currentIndex = currentIndex + thisSites.length;
        }
    }

    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: true }));
};