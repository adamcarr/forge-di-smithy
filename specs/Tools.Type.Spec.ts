/// <reference path="../declarations/jasmine.d.ts" />

import Forge = require('forge-di');
import Smithy = require('../build/Smithy');

class CustomType {};

describe('Smithy.Tools.Type', () => {
  beforeEach(() => {
  });

  it('should allow me to create a new instance', () => {
    var tool = new Smithy.Tools.Type('name', CustomType);
    expect(tool).toBeDefined();
  });

  it('should set name property to provided name on new instance', () => {
    var expectedName = 'name';
    var tool = new Smithy.Tools.Type(expectedName, CustomType);
    expect(tool.name).toEqual(expectedName);
  });

  it('should set targetType property to Smithy.TargetType.Type on new instance', () => {
    var tool = new Smithy.Tools.Type('name', CustomType);
    expect(tool.targetType).toEqual(Smithy.TargetType.Type);
  });

  it('should set default lifecycle to Smithy.Lifecycle.Singleton', () => {
    var tool = new Smithy.Tools.Type('name', CustomType);
    expect(tool.lifecycle).toEqual(Smithy.Lifecycle.Singleton);
  });

  it('should set lifecycle to lifecycle passed into the constructor', () => {
    var tool = new Smithy.Tools.Type('name', CustomType, Smithy.Lifecycle.Transient);
    expect(tool.lifecycle).toEqual(Smithy.Lifecycle.Transient);
  });

  it('should set target to target passed into the constructor', () => {
    var target = CustomType;
    var tool = new Smithy.Tools.Type('name', target);
    expect(tool.target).toEqual(target);
  });

  it('should have undefined when property if not provided', () => {
    var tool = new Smithy.Tools.Type('name', CustomType);
    expect(tool.when).toBeUndefined();
  });

  it('should set when property if provided', () => {
    var when = (name) => true;
    var tool = new Smithy.Tools.Type('name', CustomType, when);
    expect(tool.when).toEqual(when);
  });

  it('should set lifecycle and when properties if provided', () => {
    var when = (name) => true;
    var lifecycle = Smithy.Lifecycle.Transient;
    var tool = new Smithy.Tools.Type('name', CustomType, lifecycle, when);
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.when).toEqual(when);
  });

  it('should throw exception name parameter is not a string', () => {
    expect(() => new Smithy.Tools.Type(null, CustomType))
      .toThrow('Name is required and must be a string');
  });

  it('should throw exception when target parameter is not a function', () => {
    expect(() => new Smithy.Tools.Type('name', null))
      .toThrow('Target is required and must be a function');
  });

  it('should throw exception when third parameter is not a number or function', () => {
    expect(() => new Smithy.Tools.Type('name', CustomType, null))
      .toThrow('Third of 3 parameters must be either a number or function.');
  });

  it('should throw exception when third parameter is not a number when 4 parameters passed', () => {
    expect(() => new Smithy.Tools.Type('name', CustomType, null, (name) => true))
      .toThrow('Third of 4 parameters must be a number.');
  });

  it('should throw exception when fourth parameter is not a function', () => {
    expect(() => new Smithy.Tools.Type('name', CustomType, 3, null))
      .toThrow('Fourth of 4 parameters must be a function.');
  });
});