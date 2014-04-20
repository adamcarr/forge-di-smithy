/// <reference path="../declarations/jasmine.d.ts" />

import Forge = require('forge-di');
import Smithy = require('../build/Smithy');

describe('Smithy.Tools.BaseTool', () => {
  beforeEach(() => {
  });

  it('should allow me to create a new instance', () => {
    var tool = new Smithy.Tools.BaseTool('name', {}, []);
    expect(tool).toBeDefined();
  });

  it('should set name property to provided name on new instance', () => {
    var expectedName = 'name';
    var tool = new Smithy.Tools.BaseTool(expectedName, {}, []);
    expect(tool.name).toEqual(expectedName);
  });

  it('should set default lifecycle to Smithy.Lifecycle.Singleton', () => {
    var tool = new Smithy.Tools.BaseTool('name', {}, []);
    expect(tool.lifecycle).toEqual(Smithy.Lifecycle.Singleton);
  });

  it('should set lifecycle to lifecycle passed into the constructor', () => {
    var tool = new Smithy.Tools.BaseTool('name', {}, [Smithy.Lifecycle.Transient]);
    expect(tool.lifecycle).toEqual(Smithy.Lifecycle.Transient);
  });

  it('should set target to target passed into the constructor', () => {
    var target = {};
    var tool = new Smithy.Tools.BaseTool('name', target, []);
    expect(tool.target).toEqual(target);
  });

  it('should have undefined when and bindingArguments properties if not provided', () => {
    var tool = new Smithy.Tools.BaseTool('name', {}, []);
    expect(tool.when).toBeUndefined();
    expect(tool.bindingArguments).toBeUndefined();
  });

  it('should set when property if provided', () => {
    var when = (name) => true;
    var tool = new Smithy.Tools.BaseTool('name', {}, [when]);
    expect(tool.when).toEqual(when);
  });

  it('should set hint property if provided', () => {
    var hint = 'test';
    var tool = new Smithy.Tools.BaseTool('name', {}, [hint]);
    expect(tool.hint).toEqual(hint);
  });

  it('should set bindingArguments property if provided', () => {
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool('name', {}, [bindingArguments]);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  it('should set lifecycle and when properties if provided', () => {
    var when = (name) => true;
    var lifecycle = Smithy.Lifecycle.Transient;
    var tool = new Smithy.Tools.BaseTool('name', {}, [lifecycle, when]);
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.when).toEqual(when);
  });

  it('should set lifecycle and hint properties if provided', () => {
    var hint = 'test';
    var lifecycle = Smithy.Lifecycle.Transient;
    var tool = new Smithy.Tools.BaseTool('name', {}, [lifecycle, hint]);
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.hint).toEqual(hint);
  });

  it('should set lifecycle and bindingArguments properties if provided', () => {
    var lifecycle = Smithy.Lifecycle.Transient;
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool('name', {}, [lifecycle, bindingArguments]);
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  it('should set when and bindingArguments properties if provided', () => {
    var when = (name) => true;
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool('name', {}, [when, bindingArguments]);
    expect(tool.when).toEqual(when);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  it('should set hint and bindingArguments properties if provided', () => {
    var hint = 'test';
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool('name', {}, [hint, bindingArguments]);
    expect(tool.hint).toEqual(hint);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  it('should set lifecycle, when, and bindingArguments properties if provided', () => {
    var lifecycle = Smithy.Lifecycle.Transient;
    var when = (name) => true;
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool('name', {}, [lifecycle, when, bindingArguments]);
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.when).toEqual(when);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  it('should set lifecycle, hint, and bindingArguments properties if provided', () => {
    var lifecycle = Smithy.Lifecycle.Transient;
    var hint = 'test';
    var bindingArguments: Forge.IBindingArguments = {'name': {}};
    var tool = new Smithy.Tools.BaseTool('name', {}, [lifecycle, hint, bindingArguments]);
    expect(tool.lifecycle).toEqual(lifecycle);
    expect(tool.hint).toEqual(hint);
    expect(tool.bindingArguments).toEqual(bindingArguments);
  });

  describe('when parameters are not valid', () => {
    it('should throw exception name argument is not a string', () => {
      expect(() => new Smithy.Tools.BaseTool(null, {}, []))
        .toThrow('Name is required and must be a string');
    });
  
    it('should throw exception when target argument is null', () => {
      expect(() => new Smithy.Tools.BaseTool('name', null, []))
        .toThrow('Target is required');
    });
  
    it('should throw exception when target argument is undefined', () => {
      expect(() => new Smithy.Tools.BaseTool('name', undefined, []))
        .toThrow('Target is required');
    });
  
    it('should throw exception when third argument is not a number, function, or object', () => {
      expect(() => new Smithy.Tools.BaseTool('name', {}, [null]))
        .toThrow('Third of 3 arguments must be either a number, function, or object.');
    });
  
    it('should throw exception when third argument of four is not a number of function', () => {
      expect(() => new Smithy.Tools.BaseTool('name', {}, [null, (name) => true]))
        .toThrow('Third of 4 arguments must be either a number, string, or function.');
    });
  
    it('should throw exception when fourth argument of four is not a function or object and third parameter is a number', () => {
      expect(() => new Smithy.Tools.BaseTool('name', {}, [3, null]))
        .toThrow('Fourth of 4 arguments must be either a string, function, or object.');
    });
  
    it('should throw exception when fourth argument of four is not a object and third parameter is a function', () => {
      expect(() => new Smithy.Tools.BaseTool('name', {}, [(name) => true, null]))
        .toThrow('Fourth of 4 arguments must be an object if third is a function.');
    });
  
    it('should throw exception when third of five arguments is not a number', () => {
      expect(() => new Smithy.Tools.BaseTool('name', {}, [null, null, null]))
        .toThrow('Third of 5 arguments must be a number.');
    });
  
    it('should throw exception when fourth of five arguments is not a function', () => {
      expect(() => new Smithy.Tools.BaseTool('name', {}, [3, null, null]))
        .toThrow('Fourth of 5 arguments must be a function or string.');
    });
  
    it('should throw exception when fifth of five arguments is not an object', () => {
      expect(() => new Smithy.Tools.BaseTool('name', {}, [3, (name) => true, null]))
        .toThrow('Fifth of 5 arguments must be an object.');
    });
  
    it('should warn to console if more than five arguments are passed', () => {
      var consoleWarnSpy = spyOn(console, 'warn');
      
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      var test = new Smithy.Tools.BaseTool('name', {}, [3, (name) => true, {}, {}]);
      
      expect(consoleWarnSpy).toHaveBeenCalledWith('More than 5 arguments were provided. Extra arguments will be ignored.');
    });
  });
});