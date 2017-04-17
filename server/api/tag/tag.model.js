'use strict';

var mongoose = require('mongoose');
var events = require('./tag.events');

var TagSchema = new mongoose.Schema({
    name: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret._id
        }
    }
});

events.registerEvents(TagSchema);
module.exports = mongoose.model('Tag', TagSchema);
TagSchema.virtual('id').get(function() {
    return this._id;
});