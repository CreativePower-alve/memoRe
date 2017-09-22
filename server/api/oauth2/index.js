
var express = require('express');
var oauth2Controller = require('./oauth.service');
var auth = require('../../auth/auth.service');
var router = express.Router();
// Create endpoint handlers for oauth2 authorize
router.get('/authorize', auth.isAuthenticated(), oauth2Controller.authorization);
router.post('/authorize', auth.isAuthenticated(), oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.post('/token', auth.isClientAuthenticated, oauth2Controller.token);

module.exports = router;  