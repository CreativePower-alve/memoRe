/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Tag = require('../api/tag/tag.model');

var config = require('./environment/');

exports.seedDatabaseIfNeeded = function() {
    
    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'guest',
          email: 'guest@memore.com',
          password: 'guest',
          gravatar:'http://www.gravatar.com/avatar'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin',
          gravatar:'http://www.gravatar.com/avatar'
        })
        .then(function(){
           addDefaultThings();
           console.log('finished populating users');
        })
        .catch(err => console.log('error populating users', err));
      });
 
}

function addDefaultThings(tag){
   User.findOne({"name":"guest"},function(err, user){
      if(err){
        console.log("error populating things",err);
      }
      if(user){
       if(config.seedDB) {
            Tag.create({name:"default",user_id:user._id},function(err,tag){
                var tag = tag._id;
                 Thing.find({}).remove()
                  .then(() => {
                    Thing.create({
                      source: 'Development Tools',
                      text: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                            + 'Stylus, Sass, and Less.',
                      user_id:user._id,
                      tags:[tag]      
                    }, {
                      source: 'Server and Client integration',
                      test: 'Built with a powerful and fun stack: MongoDB, Express, '
                            + 'AngularJS, and Node.',
                      user_id:user._id,
                      tags:[tag]   
                    }, {
                      source: 'Smart Build System',
                      text: 'Build system ignores `spec` files, allowing you to keep '
                            + 'tests alongside code. Automatic injection of scripts and '
                            + 'styles into your index.html',
                      user_id:user._id,
                      tags:[tag]    
                    }, {
                      source: 'Modular Structure',
                      text: 'Best practice client and server structures allow for more '
                            + 'code reusability and maximum scalability',
                      user_id:user._id,
                      tags:[tag]    
                    }, {
                      source: 'Optimized Build',
                      text: 'Build process packs up your templates as a single JavaScript '
                            + 'payload, minifies your scripts/css/images, and rewrites asset '
                            + 'names for caching.',
                      user_id:user._id,
                      tags:[tag]     
                    }, {
                      source: 'Deployment Ready',
                      text: 'Easily deploy your app to Heroku or Openshift with the heroku '
                            + 'and openshift subgenerators',
                      user_id:user._id,
                      tags:[tag]     
                    });
                  })
                .then(() => console.log('finished populating things'))
                .catch(err => console.log('error populating things', err));
          });
         
        }
      }
  });
}
