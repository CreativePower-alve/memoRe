'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var gravatar = require('gravatar');
var utils = require('../../utils/utils');
var config = require('../../config/nodemailer');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var domain = process.env.NODE_ENV === 'development'? 'http://localhost:4200/' : process.env.DOMAIN; 
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
  var url = gravatar.url(req.body.email, { s: '200', r: 'pg', d: '404' });
  var newUser = new User(req.body);
  newUser.gravatar = url;
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token: token, name: newUser.name, id: newUser._id, email: newUser.email, gravatar: newUser.gravatar });
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
      if (!user) {
        return res.status(404).end();
      }
      res.json(user);
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
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(422).end();
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
  var avatarValue = req.file;
  return User.findById(userId).exec()
    .then(user => {
      user.name = name ? name : user.name;
      user.email = email ? email : user.email;
      if (avatarValue != undefined) {
           user.avatar =avatarValue.path;
            return user.save()
            .then(() => {
              res.status(204).end();
            })
            .catch(validationError(res));
      } else {
        console.log(email, 'email');
        user.gravatar = gravatar.url(email, { s: '200', r: 'pg', d: '404' });
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      }

    });
}
exports.forgotPass = function(req, res){
    var email = req.body.email;
    User.findOne({email:email}).exec()
    .then( user =>{
       if(!user){
          return res.status(422).end();
       }
         crypto.randomBytes(48, function (ex, buf) {
            // make the string url safe
            var token = buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            user.save(function(saveUser){
            var message = 'You are receiving this because you (or someone else) have requested the reset of the password for your account on MemoRe.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        domain+'reset?token=' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n';
               sendEmail(res, email, message, "MemoRe Password Reset");
            });
            
          });
    })
     
}
function sendEmail(res, email, message, subject){
     var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.email,
          pass: config.password
        }
      });
      var mailOptions = {
        to: email,
        from: config.email,
        subject:subject,
        text: message
      };
      transporter.sendMail(mailOptions, function(err) {
         if(err){
            return res.status(422).end();
         }
         return res.send('An e-mail has been sent to ' + email + ' with further instructions.');
      });
    }
 exports.resetPassword = function(req, res){
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      return res.status(404).end('token not found');
    }
      return res.status(200).end('found token');
   });
 }
  exports.resetPass = function(req, res){
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    if(password && confirmPassword && password === confirmPassword){
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
         return res.status(422).end('Password reset token is invalid or has expired.');
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          var message = 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n';
           sendEmail(res, user.email, message, "Your MemoRe password has been changed")
           return res.status(200).end('Password has been reset');
        });
      });
    }
    else{
      return res.status(422).end('Confirm Password and Password do not match');
    }
   
 }
/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      if(user.avatar){
        try{
            var base64str = utils.base64_encode(user.avatar); 
            var userWithAvatarImg = Object.assign({},user._doc,{avatar:base64str});
            res.json(userWithAvatarImg);
        }catch(ex){
          var userWithAvatarImg = Object.assign({},user._doc,{avatar:""});
          res.json(userWithAvatarImg);
        }
      }else{
        res.json(user);
      }
      
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res) {
  res.redirect('/');
}
