/// <reference path="../declarations/forge.d.ts" />
/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/lodash.d.ts" />

import Forge = require('forge-di');

var _: _.LoDashStatic = require('lodash');
var assert = require('assert');

module Smithy {
  export interface IBlacksmith {
    forge: Forge;
    registerEquipment(equipment: IEquipment): IBlacksmith;
  }

  export interface IEquipment extends Array<ITool<any>> { }
  
	interface ITypeShim<T> extends Forge.IType {
		new (...args: any[]): T;
	}

  export interface ITool<T> {
    name: string;
    target: T;
    targetType?: TargetType;
    lifecycle?: Lifecycle;
    when?: Forge.IPredicate;
    hint?: string;
    bindingArguments?: Forge.IBindingArguments;
  }

  export enum Lifecycle {
    Singleton,
    Transient
  }

  export enum TargetType {
    Type,
    Instance,
    Function
  }

  export class Blacksmith implements IBlacksmith {
    constructor(public forge: Forge) {}

    registerEquipment(equipment: IEquipment): IBlacksmith {
      _.forEach(equipment, (tool) => {
        var binding: Forge.IBinding;
        switch (tool.targetType) {
          case TargetType.Type:
            binding = this.forge.bind(tool.name).to.type(tool.target);
            break;
          case TargetType.Function:
            binding = this.forge.bind(tool.name).to.function(tool.target);
            break;
          case TargetType.Instance:
            binding = this.forge.bind(tool.name).to.instance(tool.target);
            break;
        }

        if (tool.when) {
          binding.when(tool.when);
        } else if (tool.hint) {
          binding.when(tool.hint);
        }

        if (tool.bindingArguments) {
          binding.with(tool.bindingArguments);
        }
        
        if (tool.lifecycle === Lifecycle.Transient) {
          binding.transient();
        }
      });

      return this;
    }
  }
  
  export module Tools {
    export class BaseTool<T> implements ITool<T> {
      public name: string;
      public target: T;
      public targetType: TargetType;
      public lifecycle: Lifecycle;
      public when: Forge.IPredicate;
      public hint: string;
      public bindingArguments: Forge.IBindingArguments;
  
      constructor(options: ITool<T>) {
          
        _.assign(this, options);
        
        if (_.isUndefined(this.lifecycle)) {
          this.lifecycle = Smithy.Lifecycle.Singleton;
        }
        
        assert(_.isString(this.name), "'name' is required and must be a string");
        assert(!_.isUndefined(this.target), "'target' is required");
        assert(!_.isNull(this.target), "'target' is required");
        
        if (!_.isUndefined(this.bindingArguments)) {
          assert(_.isObject(this.bindingArguments), "'bindingArguments', if defined, must be an object.");
        }
        
        if (!_.isUndefined(this.when)) {
          assert(_.isFunction(this.when), "'when', if defined, must be a function.");
        }
        
        if (!_.isUndefined(this.hint)) {
          assert(_.isString(this.hint), "'hint', if defined, must be a string.");
        }
      }
    }
    
    export class Function<T extends {(...args: any[]): any}> extends BaseTool<T> implements ITool<T> {
      constructor(options: ITool<T>) {
        super(options);
        
        this.targetType = TargetType.Function;
        
        assert(_.isFunction(this.target), "'target' is required and must be a function");
      }
    }
  
    export class Instance<T extends Object> extends BaseTool<T> implements ITool<T> {
      constructor(options: ITool<T>) {
        super(options);
        
        this.targetType = TargetType.Instance;
      }
    }
  
    export class Type<T extends Forge.IType> extends BaseTool<T> implements ITool<T> {
      constructor(options: ITool<T>) {
        super(options);
        
        this.targetType = TargetType.Type;
        
        assert(_.isFunction(this.target), "'target' is required and must be a function");
      }
    }
  }
}

export = Smithy;
