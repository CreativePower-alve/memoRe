'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTag;

describe('Tag API:', function() {
  describe('GET /api/tags', function() {
    var things;

    beforeEach(function(done) {
      request(app)
        .get('/api/tags')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          tags = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(tags).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/tags', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tags')
        .send({
          name: 'New Tag',
          info: 'This is the brand new tag!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTag = res.body;
          done();
        });
    });

    it('should respond with the newly created tag', function() {
      expect(newTag.name).to.equal('New Tag');
      expect(newTag.info).to.equal('This is the brand new tag!!!');
    });
  });

  describe('GET /api/tags/:id', function() {
    var tag;

    beforeEach(function(done) {
      request(app)
        .get(`/api/tags/${newTag._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          tag = res.body;
          done();
        });
    });

    afterEach(function() {
      tag = {};
    });

    it('should respond with the requested tag', function() {
      expect(tag.name).to.equal('New Tag');
    });
  });

  describe('PUT /api/tags/:id', function() {
    var updatedTag;

    beforeEach(function(done) {
      request(app)
        .put(`/api/tags/${newTag._id}`)
        .send({
          name: 'Updated Tag',
          info: 'This is the updated tag!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTag = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTag = {};
    });

    it('should respond with the updated thing', function() {
      expect(updatedTag.name).to.equal('Updated Tag');
      expect(updatedTag.info).to.equal('This is the updated tag!!!');
    });

    it('should respond with the updated tag on a subsequent GET', function(done) {
      request(app)
        .get(`/api/tags/${newTag._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let tag = res.body;

          expect(tag.name).to.equal('Updated Tag');
          expect(tag.info).to.equal('This is the updated tag!!!');

          done();
        });
    });
  });

  describe('PATCH /api/tags/:id', function() {
    var patchedTag;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/tags/${newTag._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Tag' },
          { op: 'replace', path: '/info', value: 'This is the patched tag!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTag = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTag = {};
    });

    it('should respond with the patched tag', function() {
      expect(patchedTag.name).to.equal('Patched Tag');
      expect(patchedTag.info).to.equal('This is the patched tag!!!');
    });
  });

  describe('DELETE /api/tags/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/tags/${newTag._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tag does not exist', function(done) {
      request(app)
        .delete(`/api/tags/${newTag._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
