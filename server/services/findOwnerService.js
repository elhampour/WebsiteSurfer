import cheerio from 'cheerio';

export default {
    find: (siteHtml) => {
        const fullHtml = cheerio.load(siteHtml);
        let trs = fullHtml('.domenGenTable').find('tr');
        let foundOwner = false;
        let ownerName = "";
        let ownerUrl = "";
        for (let index2 = 0; index2 < trs.length; index2++) {
            let parentsss = cheerio.load(trs[index2]);
            let tds = parentsss('td');
            let firstTd = tds[0];
            let fids = cheerio.load(firstTd);
            if (fids.text().toLowerCase().indexOf('owner') > -1) {
                let secondTd = tds[1];
                let asdasdsa = cheerio.load(secondTd);
                ownerName = asdasdsa("a").text();
                ownerUrl = asdasdsa("a").attr("href");
                foundOwner = true;
            }
            if (foundOwner) {
                break;
            }
        }
        return {
            name: ownerName,
            url: ownerUrl
        };
    }
};