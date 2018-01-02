'use strict';
var config = require('../config/environment');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var redirectDomain = process.env.NODE_ENV === 'development'? 'http://localhost:9000/' : process.env.DOMAIN;
//var oauth = require('../config/express').oauth;
var localStrategy = require('passport-local');
var Client = require('../api/client/client.model');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../api/token/token.model');

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }
     // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
      if(req.query && typeof req.headers.authorization === 'undefined') {
        req.headers.authorization = `Bearer ${req.cookies.token}`;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id).exec()
        .then(user => {
          if(!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
exports.hasRole = function(roleRequired) {
  if(!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        return next();
      } else {
        return res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
exports.signToken = function(id, role) {
  return jwt.sign({ _id: id, role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
exports.setTokenCookie = function(req, res) {
  if(!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = jwt.sign({ _id: req.user._id, role:req.user.role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
  res.cookie('token', token);
  res.redirect(`${redirectDomain}/google?token=${token}`);
}
exports.isAuthenticated = isAuthenticated;

passport.use('client-basic', new BasicStrategy(
  function(email, password, callback) {
    Client.findOne({ email: email }, function (err, client) {
      if (err) { return callback(err); }

      // No client found with that id or bad password
      if (!client || client.secret !== password) { return callback(null, false); }

      // Success
      return callback(null, client);
    });
  }
));

passport.use(new BearerStrategy(
  function(accessToken, callback) {
    Token.findOne({value: accessToken }, function (err, token) {
      if (err) { return callback(err); }

      // No token found
      if (!token) { return callback(null, false); }

      User.findOne({ _id: token.userId }, function (err, user) {
        if (err) { return callback(err); }

        // No user found
        if (!user) { return callback(null, false); }

        // Simple example with no scope
        callback(null, user, { scope: '*' });
      });
    });
  }
));

exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
