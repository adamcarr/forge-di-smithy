/// <reference path="../typings/tsd.d.ts" />

import Forge = require('forge-di');
import Smithy = require('../src/index');

describe('Smithy.Tools.BaseTool', () => {
  beforeEach(() => {
  });

  it('should allow me to create a new instance', () => {
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}});
    expect(tool).toBeDefined();
  });

  it('should set name property to provided name on new instance', () => {
    var expectedName = 'name';
    var tool = new Smithy.Tools.BaseTool({name: expectedName, target: {}});
    expect(tool.name).toEqual(expectedName);
  });

  it('should set default lifecycle to Smithy.Lifecycle.Singleton', () => {
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}});
    expect(tool.lifecycle).toEqual(Smithy.Lifecycle.Singleton);
  });

  it('should set lifecycle to lifecycle passed into the constructor', () => {
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, lifecycle: Smithy.Lifecycle.Transient});
    expect(tool.lifecycle).toEqual(Smithy.Lifecycle.Transient);
  });

  it('should set target to target passed into the constructor', () => {
    var target = {};
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: target});
    expect(tool.target).toEqual(target);
  });

  it('should have undefined when and bindingArguments properties if not provided', () => {
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}});
    expect(tool.when).toBeUndefined();
    expect(tool.bindingArguments).toBeUndefined();
  });

  it('should set when property if provided', () => {
    var when = (name) => true;
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, when: when});
    expect(tool.when).toEqual(when);
  });

  it('should set hint property if provided', () => {
    var hint = 'test';
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, hint: hint});
    expect(tool.hint).toEqual(hint);
  });

  it('should set bindingArguments property if provided', () => {
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, bindingArguments: bindingArguments});
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  it('should set lifecycle and when properties if provided', () => {
    var when = (name) => true;
    var lifecycle = Smithy.Lifecycle.Transient;
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, lifecycle: lifecycle, when: when});
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.when).toEqual(when);
  });

  it('should set lifecycle and hint properties if provided', () => {
    var hint = 'test';
    var lifecycle = Smithy.Lifecycle.Transient;
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, lifecycle: lifecycle, hint: hint});
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.hint).toEqual(hint);
  });

  it('should set lifecycle and bindingArguments properties if provided', () => {
    var lifecycle = Smithy.Lifecycle.Transient;
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, lifecycle: lifecycle, bindingArguments: bindingArguments});
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  it('should set when and bindingArguments properties if provided', () => {
    var when = (name) => true;
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, when: when, bindingArguments: bindingArguments});
    expect(tool.when).toEqual(when);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  it('should set hint and bindingArguments properties if provided', () => {
    var hint = 'test';
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, hint: hint, bindingArguments: bindingArguments});
    expect(tool.hint).toEqual(hint);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  it('should set lifecycle, when, and bindingArguments properties if provided', () => {
    var lifecycle = Smithy.Lifecycle.Transient;
    var when = (name) => true;
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, lifecycle: lifecycle, when: when, bindingArguments: bindingArguments});
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.when).toEqual(when);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  it('should set lifecycle, hint, and bindingArguments properties if provided', () => {
    var lifecycle = Smithy.Lifecycle.Transient;
    var hint = 'test';
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool({name: 'name', target: {}, lifecycle: lifecycle, hint: hint, bindingArguments: bindingArguments});
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.hint).toEqual(hint);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  describe('when parameters are not valid', () => {
    it('should throw exception name argument is not a string', () => {
      expect(() => new Smithy.Tools.BaseTool({name: null, target: {}}))
        .toThrow("'name' is required and must be a string");
    });
  
    it('should throw exception when target argument is null', () => {
      expect(() => new Smithy.Tools.BaseTool({name: 'name', target: null}))
        .toThrow("'target' is required");
    });
  
    it('should throw exception when target argument is undefined', () => {
      expect(() => new Smithy.Tools.BaseTool({name: 'name', target: undefined}))
        .toThrow("'target' is required");
    });
  
    it('should throw exception bindingArguments is provided but not an object', () => {
      expect(() => new Smithy.Tools.BaseTool({name: 'name', target: {}, bindingArguments: null}))
        .toThrow("'bindingArguments', if defined, must be an object.");
    });
  
    it('should throw exception when is provided but not a function', () => {
      expect(() => new Smithy.Tools.BaseTool({name: 'name', target: {}, when: null}))
        .toThrow("'when', if defined, must be a function.");
    });
  
    it('should throw exception hint is provided but not a string', () => {
      expect(() => new Smithy.Tools.BaseTool({name: 'name', target: {}, hint: null}))
        .toThrow("'hint', if defined, must be a string.");
    });
  });
});