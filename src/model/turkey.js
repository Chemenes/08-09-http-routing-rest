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

  /**
 * The functions below are all "static" methods on this model.
 * Simply put, that means that you can't use them on instances of this model, but
 * rather use them as top level functions.
 * i.e.
 *    This will use the instance method "save" to save the note we just created
 *    let myNote = new Note({title:'Hi',content:'There'});
 *    myNote.save();
 *
 *    To view a single note you would call the method on the constructor istelf:
 *    Note.fetchOne(id)
 *
 * Note that all of the below methods contain calls on our external storage mechanism
 * to perform their operations
 *
 * @returns {*}
 */
  // static fetchAll() {
   
  // }

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
