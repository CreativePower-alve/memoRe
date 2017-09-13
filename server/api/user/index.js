'use strict';

var app = require('express');
var path = require('path');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var router = new app.Router();
var multer = require('multer');
var maxsize = 3 * 1000 * 1000;
var storage = multer.diskStorage({
	destination:function(req, file, callback){
		callback(null, './uploads');
	},
	filename:function(req, file, callback){
		callback(null, req.user.id);
	}
});
var upload = multer({storage: storage, limits:{fileSize:maxsize}, dest: './uploads'});


router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/profile',  auth.isAuthenticated(), upload.single('avatar'), controller.updateProfile);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/forgot-password',controller.forgotPass);
router.get('/reset/:token',controller.resetPassword);
module.exports = router;


