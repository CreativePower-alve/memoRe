'use strict';

var express = require('express');
var controller = require('./client.controller');
var router = express.Router();
var auth = require('../../auth/auth.service');

router.post('/', auth.isAuthenticated(), controller.postClients);
router.get('/', auth.isAuthenticated(), controller.getClients);

module.exports = router;

