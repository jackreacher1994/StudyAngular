'use strict';

describe('myContacts.contacts module', function() {

  beforeEach(module('myContacts.contacts'));

  describe('myContacts.contacts controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var contactCtrl = $controller('ContactCtrl');
      expect(contactCtrl).toBeDefined();
    }));

  });
});