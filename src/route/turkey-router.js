'use strict';

const Turkey = require('../model/turkey');
const logger = require('../lib/logger');
const customResponse = require('../lib/response');

module.exports = (router) => {
  router.post('/api/v1/turkey', (request, response) => {
    console.log(response, 'LOOOK HERE');

    logger.log(logger.INFO, 'ROUTE-TURKEY: POST /api/v1/turkey');
    const newTurkey = new Turkey(request.body);
    newTurkey.save()
      .then((turkey) => {
        customResponse.sendJSON(response, 200, turkey);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.INFO, `ROUTE TURKEY: There was a bad request ${JSON.stringify(err.message)}`);
        customResponse.sendError(response, 400, err.message);
        return undefined;
      });
  });


  router.get('/api/v1/turkey', (request, response) => {
    if (!request.url.query.id) {
      customResponse.sendError(response, 404, 'Your request requires an id');
      return undefined;
    }

    Turkey.findOne(request.url.query.id)
      .then((turkey) => {
        customResponse.sendJSON(response, 200, turkey);
      })
      .catch((err) => {
        console.log(err);
        customResponse.sendError(response, 404, err.message);
      });
    return undefined;
  });


  router.delete('/api/v1/turkey', (request, response) => {
    logger.log(logger.INFO, 'ROUTE-TURKEY: DELETE /api/v1/turkey');
    if (!request.url.query.id) {
      customResponse.sendError(response, 404, 'Your request requires an ID');
      return undefined;
    }

    Turkey.delete(request.url.query.id)
      .then((turkeyId) => {
        customResponse.sendJSON(response, 204, turkeyId);
      })
      .catch((error) => {
        customResponse.sendError(response, 404, error.message);
      });
    return undefined;
  });
};
