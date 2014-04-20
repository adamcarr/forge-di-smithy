/// <reference path="../declarations/jasmine.d.ts" />

import Forge = require('forge-di');
import Smithy = require('../build/Smithy');

class CustomType {};

describe('Smithy.Tools.Type', () => {
  beforeEach(() => {
  });

  it('should set targetType property to Smithy.TargetType.Type on new instance', () => {
    var tool = new Smithy.Tools.Type('name', CustomType);
    expect(tool.targetType).toEqual(Smithy.TargetType.Type);
  });
  
  it('should throw exception when target is not a function', () => {
    expect(() => {
      var tool = new Smithy.Tools.Type('name', <any>{});
    }).toThrow('Target is required and must be a function');
  });
});