// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


module('SC.set');

test('should set arbitrary properties on an object', function() {
  var obj = {
    string: 'string',
    number: 23,
    boolTrue: true,
    boolFalse: false,
    nullValue: null
  };
  
  var newObj = {};
  
  for(var key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    equals(SC.set(newObj, key, obj[key]), obj[key], 'should return value');
    equals(SC.get(newObj, key), obj[key], 'should set value');
  }
  
});

test('should call unknownProperty if defined and value is undefined', function() {
  
  var obj = {
    count: 0,
    unknownProperty: function(key, value) {
      equals(key, 'foo', 'should pass key');
      equals(value, 'BAR', 'should pass key');
      this.count++;
      return 'FOO';
    }
  };
  
  equals(SC.set(obj, 'foo', "BAR"), 'FOO', 'should return set value');
  equals(obj.count, 1, 'should have invoked');
});

test('should call setUnknownProperty if defined and value is undefined', function() {
  
  var obj = {
    count: 0,
    
    unknownProperty: function(key, value) {
      ok(false, 'should not invoke unknownProperty is setUnknownProperty is defined');
    },
    
    setUnknownProperty: function(key, value) {
      equals(key, 'foo', 'should pass key');
      equals(value, 'BAR', 'should pass key');
      this.count++;
      return 'FOO';
    }
  };
  
  equals(SC.set(obj, 'foo', "BAR"), 'FOO', 'should return set value');
  equals(obj.count, 1, 'should have invoked');
});

