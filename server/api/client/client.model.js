'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var ClientSchema = new mongoose.Schema({
    name:  { type: String, unique: true, required: true },
    secret:  { type: String, unique: true, required: true },
    userId : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
ClientSchema.virtual('id').get(function() {
    return this._id;
});

ClientSchema
  .pre('save', function(next) {
   
    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if(saltErr) {
        return next(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.secret, (encryptErr, hashedSecret) => {
        if(encryptErr) {
          return next(encryptErr);
        }
        this.secret = hashedSecret;
        return next();
      });
    });
  });

/**
 * Methods
 */
ClientSchema.methods = {

  /**
   * Make salt
   *
   * @param {Number} [byteSize] - Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(byteSize, callback) {
    var defaultByteSize = 16;

    if(typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if(typeof arguments[1] === 'function') {
      callback = arguments[1];
    } else {
      throw new Error('Missing Callback');
    }

    if(!byteSize) {
      byteSize = defaultByteSize;
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if(err) {
        return callback(err);
      } else {
        return callback(null, salt.toString('base64'));
      }
    });
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    if(!password || !this.salt) {
      if(!callback) {
        return null;
      } else {
        return callback('Missing password or salt');
      }
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');

    if(!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
        .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, (err, key) => {
      if(err) {
        return callback(err);
      } else {
        return callback(null, key.toString('base64'));
      }
    });
  },
    generateUUID(){
        var d = new Date().getTime();
        
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
            var r = Math.random()*16%16 | 0;
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
};

module.exports = mongoose.model('Client', ClientSchema);