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

  export interface ITool<T> {
    name: string;
    target: T;
    targetType: TargetType;
    lifecycle: Lifecycle;
    when?: Forge.IPredicate;
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
        }
        
        if (tool.lifecycle === Lifecycle.Transient) {
          binding.transient();
        }
      });

      return this;
    }
  }
  
  export module Tools {
    export class Function<T extends {(...args: any[]): any}> implements ITool<T> {
      public targetType: TargetType;
      public lifecycle: Lifecycle;
      public when: Forge.IPredicate;
  
      constructor(name: string, target: T);
      constructor(name: string, target: T, lifecycle: Lifecycle);
      constructor(name: string, target: T, when: Forge.IPredicate);
      constructor(name: string, target: T, lifecycle: Lifecycle, when: Forge.IPredicate);
      constructor(
        public name: string,
        public target: T,
        ...args: any[]
        ) {
        this.targetType = TargetType.Function;
        
        this.lifecycle = Smithy.Lifecycle.Singleton;
        
        assert(_.isString(this.name), 'Name is required and must be a string');
        assert(_.isFunction(this.target), 'Target is required and must be a function');
        
        if (args.length === 1) {
          if (_.isNumber(args[0])) {
            this.lifecycle = args[0];
          } else if (_.isFunction(args[0])) {
            this.when = args[0];
          } else {
            throw 'Third of 3 parameters must be either a number or function.';
          }
        } else if (args.length >= 2) {
          assert(_.isNumber(args[0]), 'Third of 4 parameters must be a number.');
          assert(_.isFunction(args[1]), 'Fourth of 4 parameters must be a function.');
          this.lifecycle = args[0];
          this.when = args[1];
        }
      }
    }
  
    export class Instance<T extends Object> implements ITool<T> {
      public targetType: TargetType;
      public lifecycle: Lifecycle;
      public when: Forge.IPredicate;
  
      constructor(name: string, target: T);
      constructor(name: string, target: T, lifecycle: Lifecycle);
      constructor(name: string, target: T, when: Forge.IPredicate);
      constructor(name: string, target: T, lifecycle: Lifecycle, when: Forge.IPredicate);
      constructor(
        public name: string,
        public target: T,
        ...args: any[]
        ) {
        this.targetType = TargetType.Instance;
        
        this.lifecycle = Smithy.Lifecycle.Singleton;
        
        assert(_.isString(this.name), 'Name is required and must be a string');
        assert(_.isObject(this.target), 'Target is required and must be an object');
        
        if (args.length === 1) {
          if (_.isNumber(args[0])) {
            this.lifecycle = args[0];
          } else if (_.isFunction(args[0])) {
            this.when = args[0];
          } else {
            throw 'Third of 3 parameters must be either a number or function.';
          }
        } else if (args.length >= 2) {
          assert(_.isNumber(args[0]), 'Third of 4 parameters must be a number.');
          assert(_.isFunction(args[1]), 'Fourth of 4 parameters must be a function.');
          this.lifecycle = args[0];
          this.when = args[1];
        }
      }
    }
  
    export class Type<T extends Forge.IType> implements ITool<T> {
      public targetType: TargetType;
      public lifecycle: Lifecycle;
      public when: Forge.IPredicate;
  
      constructor(name: string, target: T);
      constructor(name: string, target: T, lifecycle: Lifecycle);
      constructor(name: string, target: T, when: Forge.IPredicate);
      constructor(name: string, target: T, lifecycle: Lifecycle, when: Forge.IPredicate);
      constructor(
        public name: string,
        public target: T,
        ...args: any[]
        ) {
        this.targetType = TargetType.Type;
        
        this.lifecycle = Smithy.Lifecycle.Singleton;
        
        assert(_.isString(this.name), 'Name is required and must be a string');
        assert(_.isFunction(this.target), 'Target is required and must be a function');
        
        if (args.length === 1) {
          if (_.isNumber(args[0])) {
            this.lifecycle = args[0];
          } else if (_.isFunction(args[0])) {
            this.when = args[0];
          } else {
            throw 'Third of 3 parameters must be either a number or function.';
          }
        } else if (args.length >= 2) {
          assert(_.isNumber(args[0]), 'Third of 4 parameters must be a number.');
          assert(_.isFunction(args[1]), 'Fourth of 4 parameters must be a function.');
          this.lifecycle = args[0];
          this.when = args[1];
        }
      }
    }
  }
}

export = Smithy;
