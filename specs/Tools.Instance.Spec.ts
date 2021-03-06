/// <reference path="../typings/tsd.d.ts" />

import Forge = require('forge-di');
import Smithy = require('../src/index');

describe('Smithy.Tools.Instance', () => {
  var instance = {};
  
  beforeEach(() => {
  });

  it('should set targetType property to Smithy.TargetType.Instance on new instance', () => {
    var tool = new Smithy.Tools.Instance({name: 'name', target: instance});
    expect(tool.targetType).toEqual(Smithy.TargetType.Instance);
  });
});