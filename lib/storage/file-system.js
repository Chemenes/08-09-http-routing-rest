'use strict'

const fs = require('fs');

const storage = module.exports = {};
const dataDirectory = `${__dirname}/../../data`;

storage.save = (schema, item) => {
  const file = `${dataDirectory}/${schema}/${item._id}.json`;
  const json = Json.stringify(item);
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error ('Cannot create a new item, schema required'));
    if (!item || !item.title) return reject(new Error('Cannot create a new item, item or title required'));
    fs.writeFile(file,json, (err) => {
      if (err) return reject(err);
      return resolve(item);
    });
    return undefined;
  });
};