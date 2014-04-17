/// <reference path="../declarations/jasmine.d.ts" />

import Forge = require('forge-di');
import Smithy = require('../build/Smithy');

class SomeType { }

describe('Smithy.Blacksmith', () => {
  var forge: Forge;
  var blacksmith: Smithy.IBlacksmith;

  beforeEach(() => {
    forge = new Forge();
    blacksmith = new Smithy.Blacksmith(forge);
  });

  it('should allow me to create a new instance', () => {
    expect(blacksmith).toBeDefined();
  });

  it('should set passed in forge to forge property on new instance', () => {
    expect(blacksmith.forge).toEqual(forge);
  });

  it('should return the blacksmith instance when registerEquipment is called', () => {
    var returnVal = blacksmith.registerEquipment(null);
    expect(returnVal).toEqual(blacksmith);
  });

  describe('when registering equipment', () => {
    var instanceOne = { name: 'firstInstance' },
        instanceTwo = { name: 'secondInstance' },
        instanceOneHint = 'instance1',
        instanceTwoHint = 'instance2',
        instanceOnePredicate = (hint: string) => hint === instanceOneHint,
        instanceTwoPredicate = (hint: string) => hint === instanceTwoHint,
        equipment: Smithy.IEquipment = [
          new Smithy.Tools.Function('functionTool', () => new SomeType()),
          new Smithy.Tools.Function('transientFunctionTool', () => new SomeType(), Smithy.Lifecycle.Transient),
          new Smithy.Tools.Type('typeTool', SomeType),
          new Smithy.Tools.Type('transientTypeTool', SomeType, Smithy.Lifecycle.Transient),
          new Smithy.Tools.Instance('instanceTool', instanceOne),
          new Smithy.Tools.Instance('instanceTool', instanceTwo, Smithy.Lifecycle.Transient),
          new Smithy.Tools.Instance('instanceToolWithPredicate', instanceOne, instanceOnePredicate),
          new Smithy.Tools.Instance('instanceToolWithPredicate', instanceTwo, Smithy.Lifecycle.Transient, instanceTwoPredicate)
        ],
        functionTool = equipment[0],
        transientFunctionTool = equipment[1],
        typeTool = equipment[2],
        transientTypeTool = equipment[3],
        firstInstance = equipment[4],
        secondInstance = equipment[5],
        firstInstanceWithPredicate = equipment[6],
        secondInstanceWithPredicate = equipment[7];
    
    beforeEach(() => {
      blacksmith.registerEquipment(equipment);
    });
    
    it('should add functionTool bindings', () => {
      var matchedBinding = forge.getMatchingBindings(functionTool.name);
      
      expect(matchedBinding).toBeDefined();
      expect(matchedBinding.length).toEqual(1);
      expect(matchedBinding[0].name).toEqual(functionTool.name);
      
      var firstResolve = forge.get(functionTool.name);
      expect(firstResolve).toBeDefined();
      expect(firstResolve).toEqual(functionTool.target());
      
      var secondResolve = forge.get(functionTool.name);
      expect(secondResolve).toBeDefined();
      expect(secondResolve).toBe(firstResolve);
    });
    
    it('should add transientFunctionTool bindings', () => {
      var matchedBinding = forge.getMatchingBindings(transientFunctionTool.name);
      
      expect(matchedBinding).toBeDefined();
      expect(matchedBinding.length).toEqual(1);
      expect(matchedBinding[0].name).toEqual(transientFunctionTool.name);
      
      var firstResolve = forge.get(transientFunctionTool.name);
      expect(firstResolve).toBeDefined();
      expect(firstResolve).toEqual(transientFunctionTool.target());
      
      var secondResolve = forge.get(transientFunctionTool.name);
      expect(secondResolve).toBeDefined();
      expect(secondResolve).not.toBe(firstResolve);
    });
    
    it('should add typeTool bindings', () => {
      var matchedBinding = forge.getMatchingBindings(typeTool.name);
      
      expect(matchedBinding).toBeDefined();
      expect(matchedBinding.length).toEqual(1);
      expect(matchedBinding[0].name).toEqual(typeTool.name);
      
      var firstResolve = forge.get(typeTool.name);
      expect(firstResolve).toBeDefined();
      expect(firstResolve).toEqual(new typeTool.target());
      
      var secondResolve = forge.get(typeTool.name);
      expect(secondResolve).toBeDefined();
      expect(secondResolve).toBe(firstResolve);
    });
    
    it('should add transientTypeTool bindings', () => {
      var matchedBinding = forge.getMatchingBindings(transientTypeTool.name);
      
      expect(matchedBinding).toBeDefined();
      expect(matchedBinding.length).toEqual(1);
      expect(matchedBinding[0].name).toEqual(transientTypeTool.name);
      
      var firstResolve = forge.get(transientTypeTool.name);
      expect(firstResolve).toBeDefined();
      expect(firstResolve).toEqual(new transientTypeTool.target());
      
      var secondResolve = forge.get(transientTypeTool.name);
      expect(secondResolve).toBeDefined();
      expect(secondResolve).not.toBe(firstResolve);
    });
    
    it('should add instanceTool bindings', () => {
      expect(firstInstance.name).toEqual(secondInstance.name);
      
      var matchedBinding = forge.getMatchingBindings(firstInstance.name);
      
      expect(matchedBinding).toBeDefined();
      expect(matchedBinding.length).toEqual(2);
      expect(matchedBinding[0].name).toEqual(firstInstance.name);      
      expect(matchedBinding[1].name).toEqual(secondInstance.name);
      
      var firstResolve = forge.get<any[]>(firstInstance.name);
      expect(firstResolve).toBeDefined();
      expect(firstResolve.length).toEqual(2);
      expect(firstResolve[0]).toBe(firstInstance.target);
      expect(firstResolve[1]).toBe(secondInstance.target);
    });
    
    it('should add instanceToolWithPredicate singleton bindings', () => {
      expect(firstInstanceWithPredicate.name).toEqual(secondInstanceWithPredicate.name);
      
      var matchedBinding = forge.getMatchingBindings(firstInstanceWithPredicate.name);
      expect(matchedBinding.length).toEqual(0);
      
      matchedBinding = forge.getMatchingBindings(firstInstanceWithPredicate.name, instanceOneHint);
      expect(matchedBinding).toBeDefined();
      expect(matchedBinding.length).toEqual(1);
      expect(matchedBinding[0].name).toEqual(firstInstanceWithPredicate.name); 
      expect(matchedBinding[0].predicate).toEqual(firstInstanceWithPredicate.when); 
      
      var firstResolve;
      expect(() => forge.get(firstInstanceWithPredicate.name)).toThrow();
      
      firstResolve = forge.get(firstInstanceWithPredicate.name, instanceOneHint);
      expect(firstResolve).toBeDefined();
      expect(firstResolve).toBe(firstInstanceWithPredicate.target);
      
      var secondResolve = forge.get(firstInstanceWithPredicate.name, instanceOneHint);
      expect(secondResolve).toBeDefined();
      expect(secondResolve).toBe(firstResolve);
    });
    
    it('should add instanceToolWithPredicate transient bindings', () => {
      expect(firstInstanceWithPredicate.name).toEqual(secondInstanceWithPredicate.name);
      
      var matchedBinding = forge.getMatchingBindings(secondInstanceWithPredicate.name);
      expect(matchedBinding.length).toEqual(0);
      
      matchedBinding = forge.getMatchingBindings(secondInstanceWithPredicate.name, instanceTwoHint);
      expect(matchedBinding).toBeDefined();
      expect(matchedBinding.length).toEqual(1);
      expect(matchedBinding[0].name).toEqual(secondInstanceWithPredicate.name); 
      expect(matchedBinding[0].predicate).toEqual(secondInstanceWithPredicate.when); 
      
      var firstResolve;
      expect(() => forge.get(secondInstanceWithPredicate.name)).toThrow();
      
      firstResolve = forge.get(secondInstanceWithPredicate.name, instanceTwoHint);
      expect(firstResolve).toBeDefined();
      expect(firstResolve).toBe(secondInstanceWithPredicate.target);
      
      var secondResolve = forge.get(secondInstanceWithPredicate.name, instanceTwoHint);
      expect(secondResolve).toBeDefined();
      expect(secondResolve).toBe(firstResolve);
      // since this is an instance type, transient bindings don't apply
    });
  })
});