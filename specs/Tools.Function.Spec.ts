/// <reference path="../declarations/jasmine.d.ts" />

import Forge = require('forge-di');
import Smithy = require('../build/Smithy');
  
describe('Smithy.Tools.Function', () => {
  beforeEach(() => {
  });
  
  it('should allow me to create a new instance', () => {
    var tool = new Smithy.Tools.Function('name', () => 'test');
    expect(tool).toBeDefined();
  });
  
  it('should set name property to provided name on new instance', () => {
	var expectedName = 'name';
    var tool = new Smithy.Tools.Function(expectedName, () => 'test');
    expect(tool.name).toEqual(expectedName);
  });
  
  it('should set targetType property to Smithy.TargetType.Function on new instance', () => {
    var tool = new Smithy.Tools.Function('name', () => 'test');
    expect(tool.targetType).toEqual(Smithy.TargetType.Function);
  });
  
  it('should set default lifecycle to Smithy.Lifecycle.Singleton', () => {
    var tool = new Smithy.Tools.Function('name', () => 'test');
    expect(tool.lifecycle).toEqual(Smithy.Lifecycle.Singleton);
  });
  
  it('should set lifecycle to lifecycle passed into the constructor', () => {
    var tool = new Smithy.Tools.Function('name', () => 'test', Smithy.Lifecycle.Transient);
    expect(tool.lifecycle).toEqual(Smithy.Lifecycle.Transient);
  });
  
  it('should set target to target passed into the constructor', () => {
    var target = () => 'test';
    var tool = new Smithy.Tools.Function('name', target);
    expect(tool.target).toEqual(target);
  });
  
  it('should have undefined when property if not provided', () => {
    var tool = new Smithy.Tools.Function('name', () => 'test');
    expect(tool.when).toBeUndefined();
  });
  
  it('should set when property if provided', () => {
    var when = (name) => true;
    var tool = new Smithy.Tools.Function('name', () => 'test', when);
    expect(tool.when).toEqual(when);
  });
  
  it('should set lifecycle and when properties if provided', () => {
    var when = (name) => true;
    var lifecycle = Smithy.Lifecycle.Transient;
    var tool = new Smithy.Tools.Function('name', () => 'test', lifecycle, when);
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.when).toEqual(when);
  });
  
  it('should throw exception name parameter is not a string', () => {
    expect(() => new Smithy.Tools.Function(null, () => 'test'))
      .toThrow('Name is required and must be a string');
  });
  
  it('should throw exception when target parameter is not a function', () => {
    expect(() => new Smithy.Tools.Function('name', null))
      .toThrow('Target is required and must be a function');
  });
  
  it('should throw exception when third parameter is not a number or function', () => {
    expect(() => new Smithy.Tools.Function('name', () => 'test', null))
      .toThrow('Third of 3 parameters must be either a number or function.');
  });
  
  it('should throw exception when third parameter is not a number when 4 parameters passed', () => {
    expect(() => new Smithy.Tools.Function('name', () => 'test', null, (name) => true))
      .toThrow('Third of 4 parameters must be a number.');
  });
  
  it('should throw exception when fourth parameter is not a function', () => {
    expect(() => new Smithy.Tools.Function('name', () => 'test', 3, null))
      .toThrow('Fourth of 4 parameters must be a function.');
  });
});