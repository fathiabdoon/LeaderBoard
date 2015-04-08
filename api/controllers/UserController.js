/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  //
  // Edit your user profile page here.
  //
  profile: function(req, res) {
    res.view('auth/profile', {
      // Add any variables you want to pass to your view here, like so
      // variableName: value
    });
  },

  //
  // You shouldn't need to edit anything below here unless you really want...
  //
	endSession: function(req, res) {
    req.session.user = null;
    res.redirect('/');
  },

  newSession: function(req, res) {
    var bcrypt = require('bcryptjs');

    User.findOneByUsername(req.body.username).exec(function(err, user) {
      if (err) res.json({
        error: 'DB error'
      }, 500);

      if (user) {
        bcrypt.compare(req.body.password, user.password, function(err, match) {
          if (err) res.json({
            error: 'Server error'
          }, 500);

          if (match) {
            // password match
            req.session.user = user;
            res.redirect('/board/all');
          } else {
            // invalid password
            if (req.session.user) req.session.user = null;
            res.json({
              error: 'Invalid password'
            }, 400);
          }
        });
      } else {
        res.json({
          error: 'User not found'
        }, 404);
      }
    });
  },

  newUser: function(req, res) {
     User.findOneByUsername(req.body.username).exec(function(err, user) {
      if (err) {
        console.log("User exists");
        return;
      } else {
        User.create({
          password: req.body.password,
          username: req.body.username
        }).exec(function(err, user) {
          console.log(err);
          console.log("created user", user);
          req.session.user = user;
          res.redirect('/board/all');
        });
      }
    });
  }
};

