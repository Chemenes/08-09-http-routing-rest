'use strict';

const logger = require('./logger');
const bodyParser = require('./body-parser');
const customResponse = require('./response');


module.exports = class Router {
  constructor() {
    this.routes = {
      GET: {
        '/api/v1/turkey': (req,res) => {},
        '/api/v1/turkey?id': (req,res) => {},
      },
      POST: {},
      PUT: {},
      DELETE: {},
    };
  }

  

  get(endpoint, callback) {
    this.routes.GET[endpoint] = callback;
  }

  post(endpoint, callback) {
    this.routes.POST[endpoint] = callback;
  }

  put(endpoint, callback) {
    this.routes.PUT[endpoint] = callback;
  }
  delete(endpoint, callback) {
    this.routes.DELETE[endpoint] = callback;
  }

  route() {
    return (request, response) => {
      Promise.all([bodyParser(request)])
     
        .then(() => {
         
          const requestResponseCallback = this.routes[request.method][request.url.pathname];
          const isFunction = typeof requestResponseCallback === 'function';
          if (isFunction) return requestResponseCallback(request, response);

          customResponse.sendError(response, 404, 'Route Not Registered');
          return undefined;
        })
        .catch((err) => {
          
          customResponse.sendError(response, 404, 'Route Not Found');
          return undefined;
        });
    };
  }
};
