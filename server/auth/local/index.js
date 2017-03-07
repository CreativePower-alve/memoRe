'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }
    var token = auth.signToken(user._id, user.role);
    res.json({ token:token, email:user.email, name:user.name, gravatar:user.gravatar, id:user._id });
  })(req, res, next);
});

module.exports = router;
