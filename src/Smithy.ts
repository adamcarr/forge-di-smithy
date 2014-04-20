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
    targetType: TargetType;
    lifecycle: Lifecycle;
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
      public targetType: TargetType;
      public lifecycle: Lifecycle;
      public when: Forge.IPredicate;
      public hint: string;
      public bindingArguments: Forge.IBindingArguments;
  
      constructor(
        public name: string,
        public target: T,
        args: any[]
        ) {
        
        this.lifecycle = Smithy.Lifecycle.Singleton;
        
        assert(_.isString(this.name), 'Name is required and must be a string');
        assert(!_.isUndefined(this.target), 'Target is required');
        assert(!_.isNull(this.target), 'Target is required');
        
        if (args.length === 1) {
          if (_.isNumber(args[0])) {
            this.lifecycle = args[0];
          } else if (_.isFunction(args[0])) {
            this.when = args[0];
          } else if (_.isString(args[0])) {
            this.hint = args[0];
          } else if (_.isObject(args[0])) {
            this.bindingArguments = args[0];
          } else {
            throw 'Third of 3 arguments must be either a number, function, or object.';
          }
        } else if (args.length === 2) {
          if (_.isNumber(args[0])) {
            this.lifecycle = args[0];
            if (_.isFunction(args[1])) {
              this.when = args[1];
            } else if (_.isString(args[1])) {
              this.hint = args[1];
            } else if (_.isObject(args[1])) {
              this.bindingArguments = args[1];
            } else {
              throw 'Fourth of 4 arguments must be either a string, function, or object.';
            }
          } else if (_.isFunction(args[0])) {
            assert(_.isObject(args[1]), 'Fourth of 4 arguments must be an object if third is a function.');
            this.when = args[0];
            this.bindingArguments = args[1];
          } else if (_.isString(args[0])) {
            assert(_.isObject(args[1]), 'Fourth of 4 arguments must be an object if third is a function.');
            this.hint = args[0];
            this.bindingArguments = args[1];
          } else {
            throw 'Third of 4 arguments must be either a number, string, or function.';
          }
        } else if (args.length >= 3) {
          assert(_.isNumber(args[0]), 'Third of 5 arguments must be a number.');
          assert(_.isFunction(args[1]) || _.isString(args[1]), 'Fourth of 5 arguments must be a function or string.');
          assert(_.isObject(args[2]), 'Fifth of 5 arguments must be an object.');
          this.lifecycle = args[0];
          if (_.isFunction(args[1])) {
            this.when = args[1];
          } else {
            this.hint = args[1];
          }
          this.bindingArguments = args[2];
          
          if (args.length > 3) {
            console.warn('More than 5 arguments were provided. Extra arguments will be ignored.');
          }
        }
      }
    }
    
    export class Function<T extends {(...args: any[]): any}> extends BaseTool<T> implements ITool<T> {
      constructor(name: string, target: T);
      constructor(name: string, target: T, lifecycle: Lifecycle);
      constructor(name: string, target: T, when: Forge.IPredicate);
      constructor(name: string, target: T, hint: string);
      constructor(name: string, target: T, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, lifecycle: Lifecycle, when: Forge.IPredicate);
      constructor(name: string, target: T, lifecycle: Lifecycle, hint: string);
      constructor(name: string, target: T, lifecycle: Lifecycle, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, when: Forge.IPredicate, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, hint: string, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, lifecycle: Lifecycle, when: Forge.IPredicate, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, lifecycle: Lifecycle, hint: string, bindingArguments: Forge.IBindingArguments);
      constructor(
        public name: string,
        public target: T,
        ...args: any[]
        ) {
        super(name, target, args);
        
        this.targetType = TargetType.Function;
        
        assert(_.isFunction(this.target), 'Target is required and must be a function');
      }
    }
  
    export class Instance<T extends Object> extends BaseTool<T> implements ITool<T> {
      constructor(name: string, target: T);
      constructor(name: string, target: T, lifecycle: Lifecycle);
      constructor(name: string, target: T, when: Forge.IPredicate);
      constructor(name: string, target: T, hint: string);
      constructor(name: string, target: T, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, lifecycle: Lifecycle, when: Forge.IPredicate);
      constructor(name: string, target: T, lifecycle: Lifecycle, hint: string);
      constructor(name: string, target: T, lifecycle: Lifecycle, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, when: Forge.IPredicate, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, hint: string, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, lifecycle: Lifecycle, when: Forge.IPredicate, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, lifecycle: Lifecycle, hint: string, bindingArguments: Forge.IBindingArguments);
      constructor(
        public name: string,
        public target: T,
        ...args: any[]
        ) {
        super(name, target, args);
        
        this.targetType = TargetType.Instance;
      }
    }
  
    export class Type<T extends Forge.IType> extends BaseTool<T> implements ITool<T> {
      constructor(name: string, target: T);
      constructor(name: string, target: T, lifecycle: Lifecycle);
      constructor(name: string, target: T, when: Forge.IPredicate);
      constructor(name: string, target: T, hint: string);
      constructor(name: string, target: T, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, lifecycle: Lifecycle, when: Forge.IPredicate);
      constructor(name: string, target: T, lifecycle: Lifecycle, hint: string);
      constructor(name: string, target: T, lifecycle: Lifecycle, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, when: Forge.IPredicate, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, hint: string, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, lifecycle: Lifecycle, when: Forge.IPredicate, bindingArguments: Forge.IBindingArguments);
      constructor(name: string, target: T, lifecycle: Lifecycle, hint: string, bindingArguments: Forge.IBindingArguments);
      constructor(
        public name: string,
        public target: T,
        ...args: any[]
        ) {
        super(name, target, args);
        
        this.targetType = TargetType.Type;
        
        assert(_.isFunction(this.target), 'Target is required and must be a function');
      }
    }
  }
}

export = Smithy;
