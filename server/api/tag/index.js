'use strict';

var express = require('express');
var controller = require('./tag.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;