'use strict';

const superagent = require('superagent');
const server = require('../lib/server');
const turkey = require('../model/turkey');

const apiUrl = 'http://localhost:5000/api/v1/turkey';

const mockResource = {
  flavor: 'test flavor',
  style: 'test style',
};

beforeAll(() => server.start(5000));
afterAll(() => server.stop());


describe('POST to /api/v1/turkey', () => {
  test('200 for successful saving of a new turkey', () => {
    return superagent.post(apiUrl)
      .send(mockResource)
      .then((response) => {
        expect(response.body.flavor).toEqual(mockResource.flavor);
        expect(response.body.style).toEqual(mockResource.style);
        expect(response.body._id).toBeTruthy();
        expect(response.status).toEqual(200);
      })
      .catch((err) => {
       
        throw err;
      });
  });

  test('400 bad request', () => {
    return superagent.post(apiUrl)
      .send({})
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
        expect(err).toBeInstanceOf(Error);
      });
  });
});

describe('GET /api/v1/turkeys', () => {
  let mockResourceForGet;
  beforeEach(() => {
    const newTurkey = new Turkey(mockResource);
    newTurkey.save()
      .then((turkey) => {
        mockResourceForGet = turkey;
      })
      .catch((err) => {
        throw err;
      });
  });

  test('200 successful GET request', () => {
    return superagent.get(`${apiUrl}?id=${mockResourceForGet._id}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.flavor).toEqual(mockResourceForGet.flavor);
        expect(response.body.style).toEqual(mockResourceForGet.style);
        expect(response.body.createdOn).toEqual(mockResourceForGet.createdOn.toISOString());
      })
      .catch((err) => {
        throw err;
      });
  });

  test ('404 bad GET request', () => {
    return superagent.get(`${apiUrl}`)
    .then((response) => {
      throw err;
    })
    .catch((err) => {
      expect (err.status).toEqual(404);
    });
  }
});

describe('DELETE /api/v1/turkeys', () => {
  let mockResourceForGet;
  beforeEach((done) => {
    const newTurkey = new Turkey(mockResource);
    newTurkey.save()
    .then((turkey) => {
      mockResourceForGet = turkey;
      done();
    })
    .catch((err) => {
      throw err;
    });
  });
  test('200 successful DELETE request', () =>  {
    console.log(`DELETE ${mockResponseForGet._id}`);
    return superagent.delete(`${apiUrl}?id=${mockResponseForGet._id}`)
    .then((response) => {
      expect(response.status).toEqual(200);
    })
    .catch((err) => {
      throw err;
    });
  });
  test('404 bad DELETE request', () => {
    return superagent.delete(`${apiUrl}`)
    .then((response) => {
      throw err;
    })
    .catch((err) => {
      expect(err.status).toEqual(404);
    });
  });
});
describe('bad request no input', () => {
  test('404 bad request', () => {
    return superagent.get(`${apiUrl}`)
    .then((response) => {
      throw err;
    })
    .catch((err) => {
      expect(err.status).toEqual(404);
    });
  });
});

//test