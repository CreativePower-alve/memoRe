/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  upsert
 * PATCH   /api/things/:id          ->  patch
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

var jsonpatch = require('fast-json-patch');
var Thing = require('./thing.model');
var Tag = require('../tag/tag.model');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
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

// Gets a list of Things
exports.index = function(req, res) {
  return Thing.find({ "user_id": req.user.id })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Thing from the DB
exports.show = function(req, res) {
  return Thing.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Thing in the DB
exports.create = function(req, res) {
  var user = req.user.id;
  var tags = [];
 
  req.body.tags.forEach((tagBody) => {
    tags.push(handleTag(tagBody,user));
  });

  Promise.all(tags).then(function(tagsValues) {
    tagsValues = tagsValues.filter((tag) => tag !== undefined);
    var ThingBody = {
      "user_id": user,
      "text": req.body.text,
      "source": req.body.source,
      "tags": tagsValues
    };
    Thing.create(ThingBody)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  });
}

// Upserts the given Thing in the DB at the specified ID
exports.upsert = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
   var user = req.user.id;
   var tags = [];
 
  req.body.tags.forEach((tagBody) => {
    tags.push(handleTag(tagBody,user));
  });
  Promise.all(tags).then(function(tagsValues) {
    tagsValues = tagsValues.filter((tag) => tag !== undefined);
    var ThingBody = {
      "user_id": user,
      "text": req.body.text,
      "source": req.body.source,
      "tags": tagsValues
    };
    Thing.findOneAndUpdate({
      _id: req.params.id
    }, ThingBody, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true
    })
    .populate("tags")
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
  });
}

// Updates an existing Thing in the DB
exports.patch = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Thing.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a Thing from the DB
exports.destroy = function(req, res) {
  return Thing.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function handleTag(tagBody,user) {

  return new Promise((resolve, reject) => {
    Tag.findOne({
        'name': tagBody.name.trim(),
        'user_id': ObjectId(user)
      })
      .exec(function(err, tagFound) {
        if (!tagFound) {
          Tag.create({
            name: tagBody.name,
            user_id: ObjectId(user)
          }).then(function(createdTag, err) {
            resolve(createdTag);
          });
        } else {
          resolve(tagFound);
        }
      });
  })
}
