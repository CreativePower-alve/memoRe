'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/memore-dev'
    },
   'secret': 'super secret password!',

    seedDB: true
};