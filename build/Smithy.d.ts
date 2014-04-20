/// <reference path="../declarations/forge.d.ts" />
/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/lodash.d.ts" />
import Forge = require('forge-di');
declare module Smithy {
    interface IBlacksmith {
        forge: Forge;
        registerEquipment(equipment: IEquipment): IBlacksmith;
    }
    interface IEquipment extends Array<ITool<any>> {
    }
    interface ITool<T> {
        name: string;
        target: T;
        targetType?: TargetType;
        lifecycle?: Lifecycle;
        when?: Forge.IPredicate;
        hint?: string;
        bindingArguments?: Forge.IBindingArguments;
    }
    enum Lifecycle {
        Singleton = 0,
        Transient = 1,
    }
    enum TargetType {
        Type = 0,
        Instance = 1,
        Function = 2,
    }
    class Blacksmith implements IBlacksmith {
        public forge: Forge;
        constructor(forge: Forge);
        public registerEquipment(equipment: IEquipment): IBlacksmith;
    }
    module Tools {
        class BaseTool<T> implements ITool<T> {
            public name: string;
            public target: T;
            public targetType: TargetType;
            public lifecycle: Lifecycle;
            public when: Forge.IPredicate;
            public hint: string;
            public bindingArguments: Forge.IBindingArguments;
            constructor(options: ITool<T>);
        }
        class Function<T extends (...args: any[]) => any> extends BaseTool<T> implements ITool<T> {
            constructor(options: ITool<T>);
        }
        class Instance<T extends Object> extends BaseTool<T> implements ITool<T> {
            constructor(options: ITool<T>);
        }
        class Type<T extends Forge.IType> extends BaseTool<T> implements ITool<T> {
            constructor(options: ITool<T>);
        }
    }
}
export = Smithy;
