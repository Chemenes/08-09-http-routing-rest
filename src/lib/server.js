'use strict';

const http = require('http');


const Router = require('./router');

const router = new Router();
require('../route/turkey-router')(router);

const app = http.createServer(router.route());

const serverStart = (port, callback) => app.listen(port, callback);
const serverStop = callback => app.close(callback);
export { serverStart, serverStop };
