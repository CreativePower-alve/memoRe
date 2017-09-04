'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://root:root@ds123930.mlab.com:23930/memore'
    },
   'secret': 'super secret password!',

    seedDB: true
};