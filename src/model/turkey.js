'use strict';

const uuid = require('uuid/v4');
const storage = require('../lib/storage/main.js');

module.exports = class Turkey {
  constructor(config) {
    this._id = uuid();
    this.createdOn = new Date();
    this.flavor = config.flavor;
    this.style = config.style;
  }

  save() {
    return storage.save('Turkey', this);
  }

  static fetchAll() {
    return storage.fetchAll('Turkey', this)
  }

  static findOne(_id) {
    return storage.get('Turkey', _id);
  }

  static updateOne(query) {
     return storage.updateOne('Turkey', query )
  }

  static deleteOne(_id) {
     return storage.deleteOne('Turkey', _id)
  }
};