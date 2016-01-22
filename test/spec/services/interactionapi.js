'use strict';

describe('Service: interactionAPI', function () {

  // load the service's module
  beforeEach(module('statsGhApp'));

  // instantiate service
  var interactionAPI;
  beforeEach(inject(function (_interactionAPI_) {
    interactionAPI = _interactionAPI_;
  }));

  it('should do something', function () {
    expect(!!interactionAPI).toBe(true);
  });

});
