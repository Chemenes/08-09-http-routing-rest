'use strict';

const uuid = require('uuid/v4');
const storage = require('../lib/storage');


module.exports = class Turkey {
  constructor(config) {
    this._id = uuid();
    this.createdOn = new Date();
    this.flavor = config.flavor;

    this.style = config.style || '';
  }

  save() {
    return storage.save('Turkeys', this);
  }


  static findOne(_id) {
    return storage.get('Turkeys', _id);
  }

  static updateOne(_id) {
    return storage.put('Turkeys', _id);
  }

  static delete(_id) {
    return storage.delete('Turkeys', _id);
  }
};
