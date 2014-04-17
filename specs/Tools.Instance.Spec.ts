/// <reference path="../declarations/jasmine.d.ts" />

import Forge = require('forge-di');
import Smithy = require('../build/Smithy');

describe('Smithy.Tools.Instance', () => {
  var instance = {};
  
  beforeEach(() => {
  });

  it('should allow me to create a new instance', () => {
    var tool = new Smithy.Tools.Instance('name', instance);
    expect(tool).toBeDefined();
  });

  it('should set name property to provided name on new instance', () => {
    var expectedName = 'name';
    var tool = new Smithy.Tools.Instance(expectedName, instance);
    expect(tool.name).toEqual(expectedName);
  });

  it('should set targetType property to Smithy.TargetType.Instance on new instance', () => {
    var tool = new Smithy.Tools.Instance('name', instance);
    expect(tool.targetType).toEqual(Smithy.TargetType.Instance);
  });

  it('should set default lifecycle to Smithy.Lifecycle.Singleton', () => {
    var tool = new Smithy.Tools.Instance('name', instance);
    expect(tool.lifecycle).toEqual(Smithy.Lifecycle.Singleton);
  });

  it('should set lifecycle to lifecycle passed into the constructor', () => {
    var tool = new Smithy.Tools.Instance('name', instance, Smithy.Lifecycle.Transient);
    expect(tool.lifecycle).toEqual(Smithy.Lifecycle.Transient);
  });

  it('should set target to target passed into the constructor', () => {
    var target = instance;
    var tool = new Smithy.Tools.Instance('name', target);
    expect(tool.target).toEqual(target);
  });

  it('should have undefined when property if not provided', () => {
    var tool = new Smithy.Tools.Instance('name', instance);
    expect(tool.when).toBeUndefined();
  });

  it('should set when property if provided', () => {
    var when = (name) => true;
    var tool = new Smithy.Tools.Instance('name', instance, when);
    expect(tool.when).toEqual(when);
  });

  it('should set lifecycle and when properties if provided', () => {
    var when = (name) => true;
    var lifecycle = Smithy.Lifecycle.Transient;
    var tool = new Smithy.Tools.Instance('name', instance, lifecycle, when);
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.when).toEqual(when);
  });

  it('should throw exception name parameter is not a string', () => {
    expect(() => new Smithy.Tools.Instance(null, instance))
      .toThrow('Name is required and must be a string');
  });

  it('should throw exception when target parameter is not a function', () => {
    expect(() => new Smithy.Tools.Instance('name', null))
      .toThrow('Target is required and must be an object');
  });

  it('should throw exception when third parameter is not a number or function', () => {
    expect(() => new Smithy.Tools.Instance('name', instance, null))
      .toThrow('Third of 3 parameters must be either a number or function.');
  });

  it('should throw exception when third parameter is not a number when 4 parameters passed', () => {
    expect(() => new Smithy.Tools.Instance('name', instance, null, (name) => true))
      .toThrow('Third of 4 parameters must be a number.');
  });

  it('should throw exception when fourth parameter is not a function', () => {
    expect(() => new Smithy.Tools.Instance('name', instance, 3, null))
      .toThrow('Fourth of 4 parameters must be a function.');
  });
});