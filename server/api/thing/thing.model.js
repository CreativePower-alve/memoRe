'use strict';

var mongoose = require('mongoose');
var events = require('./thing.events');

var ThingSchema = new mongoose.Schema({
    text: String,
    source: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
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
ThingSchema.virtual('id').get(function() {
    return this._id;
});

events.registerEvents(ThingSchema);
module.exports = mongoose.model('Thing', ThingSchema);