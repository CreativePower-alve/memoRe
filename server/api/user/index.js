'use strict';

var app = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var router = new app.Router();


router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/profile', auth.isAuthenticated(), function(req,res){
	console.log('req.file',req.files);
	console.log('req.avatar',req.avatar);
	console.log('req.body',req.body);
});
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;


