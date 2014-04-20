/// <reference path="../declarations/jasmine.d.ts" />

import Forge = require('forge-di');
import Smithy = require('../build/Smithy');
  
describe('Smithy.Tools.Function', () => {
  beforeEach(() => {
  });
  
  it('should set targetType property to Smithy.TargetType.Function on new instance', () => {
    var tool = new Smithy.Tools.Function('name', () => 'test');
    expect(tool.targetType).toEqual(Smithy.TargetType.Function);
  });
  
  it('should throw exception when target is not a function', () => {
    expect(() => {
      var tool = new Smithy.Tools.Function('name', <any>{});
    }).toThrow('Target is required and must be a function');
  });
  
});