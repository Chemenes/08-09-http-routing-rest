'use strict';

import { startServer } from './lib/server';

const logger = require('./lib/logger.js');

startServer(process.env.PORT, () => logger.log(logger.INFO, `MAIN: listening on ${process.env.PORT}`));