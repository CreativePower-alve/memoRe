/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tags              ->  index
 * POST    /api/tags              ->  create
 * GET     /api/tags/:id          ->  show
 * PUT     /api/tags/:id          ->  upsert
 * PATCH   /api/tags/:id          ->  patch
 * DELETE  /api/tags/:id          ->  destroy
 */

'use strict';

var jsonpatch = require('fast-json-patch');
var tag = require('./tag.model');
var Thing = require('../thing/thing.model');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of tags
exports.index = function(req, res) {
  return tag.find({'user_id':req.user.id}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single tag from the DB
exports.show = function(req, res) {
  return tag.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Thing in the DB
exports.create = function(req, res) {
  return tag.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Thing in the DB at the specified ID
exports.upsert = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return tag.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Thing in the DB
exports.patch = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return tag.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Thing from the DB
exports.destroy = function(req, res) {
  var tagId = req.params.id;
  console.log('tagId',tagId);
  tag.findOne({ _id:tagId }, function(err, foundTag){
    console.log('foundTag',foundTag);
     if(foundTag){
        Thing.find({ "tags": { "$in" : [ObjectId(tagId)]} }, function(err,foundThings){
        var things = [];
        foundThings.forEach((thing) => things.push(updateThings(thing,tagId)));
       return Promise.all(things)
              .then(function(updatedThing){
                 foundTag
                    .remove()
                    .then(respondWithResult(res))
                    .catch(handleError(res));
              });
            
        });
     }
     else{
       return res.status(404).end();
     }
      
  });
}
function updateThings(thing,tagId){
    return new Promise( (resolve,reject) =>{
        var newTags = thing.tags.filter((tag) => tag !=tagId);
        thing.tags = newTags;
        Thing.findOneAndUpdate({
            _id: thing.id
          }, thing, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            runValidators: true
          }).exec()
          .then(function(err,updatedThing){
            if(err) resolve(false);
            else resolve(true);
          });
    });
     
}
