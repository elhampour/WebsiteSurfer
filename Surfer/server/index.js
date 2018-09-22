import express from 'express';
import yields from 'express-yields';
import open from 'open';
import bodyParser from 'body-parser';

import HomeController from './controllers/homeController';

const port = process.env.PORT || 4100;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('*', HomeController);

app.listen(port, '0.0.0.0', () => {
    if (process.env.NODE_ENV === 'development') {
        open(`http://localhost:${port}`);
    }
});