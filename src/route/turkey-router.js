'use strict';

const Turkey = require('../model/turkey');
const logger = require('../lib/logger');
const customResponse = require('../lib/response');

module.exports = (router) => {
  router.post('/api/v1/turkey', (request, response) => {
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
      customResponse.sendError(response, 404, 'No ID');
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

  router.delete('.api/v1/turkey', (request, response) => {
    if (!request.url.query.id) {
      customResponse.sendError(response, 404, 'No ID');
      return undefined;
    }
    Turkey.deleteOne(request.url.query.id)
      .then((turkey) => {
        customResponse.sendJson(response, 200, turkey);
        console.log(`${request.url.query.id} delete`);
      })
      .catch((err) => {
        console.log(err);
        customResponse.sendError(response, 404, err.message);
      });
    return undefined;
  });

  router.put('api/v1/turkey', (request, response) => {
    console.log('PUT /api/v1/turkey');
    if (!request.body.id) {
      customResponse.sendError(response, 404, 'Missing id');
      return undefinied;
    }
    Turkey.updateOne(request.body)
      .then((turkey) => {
        customeResponse.sendJSON(respsone, 200, turkey);
        console.log(`${request.body.id} update`);
      })
      .catch((err) => {
        console.log(err);
        customResponse.sendError(response, 404, err.message);
      });
    return undefined;
  });
};
