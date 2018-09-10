import cheerio from 'cheerio';

export default {
    find: (siteHtml) => {
        const fullHtml = cheerio.load(siteHtml);
        let siteTitle = fullHtml('div[id="title"]').text();
        return siteTitle;
    }
};