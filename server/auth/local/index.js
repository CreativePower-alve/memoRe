'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var User = require('../../api/user/user.model')
var router = express.Router();
var utils = require('../../utils/utils');
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
    var newUser = {
         token:token, 
         email:user.email, 
         name:user.name, 
         gravatar:user.gravatar, 
         _id:user._id,
         provider:user.provider };
    if(user.avatar){
        try{
            var base64str = utils.base64_encode(user.avatar); 
            var userWithAvatarImg = Object.assign({},newUser,{avatar:base64str});
            res.json(userWithAvatarImg);
        }catch(ex){
          console.log('ex',ex);
          var userWithAvatarImg = Object.assign({},newUser,{avatar:""});
          res.json(userWithAvatarImg);
        }
      }else{
        res.json(newUser);
      }
  })(req, res, next);
});


module.exports = router;
