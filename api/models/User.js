/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

//var bcrypt = require('bcrypt');
var crypto = require('crypto');

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    company: {
      type: 'string',
      defaultsTo: 'UBG'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  beforeCreate: function(user, cb) {
    var md5 = crypto.createHash('md5');
    try{
      user.password = md5.update(user.password).digest("hex");
      cb(null, user);
    }catch(err){
      cb(err);
    }


    //bcrypt.genSalt(10, function(err, salt) {
    //  bcrypt.hash(user.password, salt, function(err, hash) {
    //    if (err) {
    //      console.log(err);
    //      cb(err);
    //    }else{
    //      user.password = hash;
    //      cb(null, user);
    //    }
    //  });
    //});
  }

};

