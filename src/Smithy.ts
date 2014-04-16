/// <reference path="../declarations/forge.d.ts" />
/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/lodash.d.ts" />

import Forge = require('forge-di');

var _: _.LoDashStatic = require('lodash');

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
      });

      return this;
    }
  }
  
  export module Tools {
    export class Function<T extends {(...args: any[]): any}> implements ITool<T> {
      public targetType: TargetType;
  
      constructor(
        public name: string,
        public target: T,
        public lifecycle: Lifecycle = Lifecycle.Singleton,
        public when?: Forge.IPredicate
        ) {
        this.targetType = TargetType.Function;
      }
    }
  
    export class Instance<T extends Object> implements ITool<T> {
      public targetType: TargetType;
  
      constructor(
        public name: string,
        public target: T,
        public lifecycle: Lifecycle = Lifecycle.Singleton,
        public when?: Forge.IPredicate
        ) {
        this.targetType = TargetType.Instance;
      }
    }
  
    export class Type<T extends Forge.IType> implements ITool<T> {
      public targetType: TargetType;
  
      constructor(
        public name: string,
        public target: T,
        public lifecycle: Lifecycle = Lifecycle.Singleton,
        public when?: Forge.IPredicate
        ) {
        this.targetType = TargetType.Type;
      }
    }
  }
}

export = Smithy;
