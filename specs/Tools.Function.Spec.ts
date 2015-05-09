/// <reference path="../typings/tsd.d.ts" />

import Forge = require('forge-di');
import Smithy = require('../src/index');
  
describe('Smithy.Tools.Function', () => {
  beforeEach(() => {
  });
  
  it('should set targetType property to Smithy.TargetType.Function on new instance', () => {
    var tool = new Smithy.Tools.Function({name: 'name', target: () => 'test'});
    expect(tool.targetType).toEqual(Smithy.TargetType.Function);
  });
  
  it('should throw exception when target is not a function', () => {
    expect(() => {
      var tool = new Smithy.Tools.Function({name: 'name', target: <any>{}});
    }).toThrow("'target' is required and must be a function");
  });
  
});