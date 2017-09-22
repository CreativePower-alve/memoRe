/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var auth = require('./auth/auth.service');

module.exports= function(app) {
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, enctype , Accept, Authorization, Access-Control-Allow-Credentials')
  next()
})

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/tags', require('./api/tag'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/clients', require('./api/client'));
  app.use('/auth', require('./auth').router);
  //customize error/unauthorized response 
  app.use(function(err, req, res, next){
    console.error(err.stack);
    if(err.message == "File too large"){
      res.send(422);
    }else if(err.status == 401){
      res.send(401, 'Unauthorized');  
    }
    else{
      res.send(401, 'Something went wrong'); 
    }
    
  });
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
