'use strict';
var express = require('express');
var config = require('../config/environment');
var User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);
require('./google/passport').setup(User, config);
var router = express.Router();

router.use('/local', require('./local').router);
router.use('/google', require('./google'));
exports.router = router;
