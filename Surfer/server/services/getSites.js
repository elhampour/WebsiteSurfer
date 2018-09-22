export default {
    get: (siteUrl,emailsAndPopSites) => {
        let sites = [siteUrl];
        sites = sites.concat(emailsAndPopSites.popularSites);
        for (let index2 = 0; index2 < emailsAndPopSites.emails.length; index2++) {
            let ssdsds = emailsAndPopSites.emails[index2];
            sites = sites.concat(ssdsds.sites);
        }
        return sites;
    }
};