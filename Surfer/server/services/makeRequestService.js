import IsomorphicFetch from 'isomorphic-fetch';

export default function * (url){
    let options = {
        method: 'get'
    };
    let raw = yield IsomorphicFetch(url, options);
    let html = yield raw.text();
    return html;
};