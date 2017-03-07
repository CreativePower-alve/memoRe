'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var thingCtrlStub = {
  index: 'tagCtrl.index',
  show: 'tagCtrl.show',
  create: 'tagCtrl.create',
  upsert: 'tagCtrl.upsert',
  patch: 'tagCtrl.patch',
  destroy: 'tagCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var thingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './tag.controller': thingCtrlStub
});

describe('tag API Router:', function() {
  it('should return an express router instance', function() {
    expect(tagIndex).to.equal(routerStub);
  });

  describe('GET /api/tags', function() {
    it('should route to tag.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'tagCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/tags/:id', function() {
    it('should route to tag.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'tagCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/tags', function() {
    it('should route to tag.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'tagCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/tags/:id', function() {
    it('should route to tag.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'tagCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/tags/:id', function() {
    it('should route to tag.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'tagCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/tags/:id', function() {
    it('should route to tag.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'tagCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
