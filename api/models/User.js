/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    username: {
      type: 'string',
      minLength: 1,
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true
    }
  },

  beforeCreate: function(user, next) {
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        console.log(err);
      }

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
        }

        user.password = hash;
        next(null, user);
      });
    });
  }
};

