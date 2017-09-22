    /**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');
var ejs = require('ejs');
// var oauthserver = require('node-oauth2-server');
// var oauth =  oauthserver({
//         model: require('../api/client/model.js'),
//         grants: ['password', 'client_credentials'],
//         debug: true
//     });

var expressFunction = function(app) {
    var env = app.get('env');

    app.set('views', config.root + '/server/views');
    app.engine('ejs', require('ejs').renderFile);
    app.set('view engine', 'ejs'); 
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({
      secret: 'MemoRe Super Secret Session Key',
      saveUninitialized: true,
      resave: true
    }));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());
    
   // app.oauth = oauth;

    // app.post('/oauth/token', app.oauth.grant());

    // app.get('/', app.oauth.authorise(), function (req, res) {
    //     res.send('Congratulations, you are in a secret area!');
    // });

    // app.use(app.oauth.errorHandler());

    console.log("env",env);
    if ('production' === env) {
        app.use(favicon(path.join(config.root, 'dist', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'dist')));
        console.log("config.root",config.root);
        app.set('appPath', path.join(config.root, 'dist'));
       // app.use(morgan('dev'));
    }

    if ('development' === env || 'test' === env) {
        app.use(require('connect-livereload')());
        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'dist')));
        app.set('appPath', path.join(config.root, 'dist'));
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};
module.exports = {
   // oauth : oauth,
    appExpress: expressFunction
}