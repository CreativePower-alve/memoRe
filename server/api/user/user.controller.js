'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
exports.create = function(req, res) {
  console.log(req.body.email);
  var url = gravatar.url(req.body.email, {s: '200', r: 'pg', d: '404'});
  var newUser = new User(req.body);
  newUser.gravatar = url;
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token:token, name:newUser.name, id:newUser._id, email:newUser.email,gravatar:newUser.gravatar });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
exports.changePassword = function(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}
/**
* Update a user's profile
*/
exports.updateProfile = function(req, res) {
  var userId = req.user._id;
  var name = String(req.body.name);
  var email = String(req.body.email);
  var avatarValue = req.body.avatar;
 
  return User.findById(userId).exec()
    .then(user => {
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        if(avatarValue != undefined){
          user.avatar = avatarValue;  
        }else{
          console.log(email,'email');
          user.gravatar = gravatar.url(email, {s: '200', r: 'pg', d: '404'});
        }
        //console.log(user.avatar == null, 'test');
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
    });
}
/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res) {
  res.redirect('/');
}
