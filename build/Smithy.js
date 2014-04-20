var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var _ = require('lodash');
var assert = require('assert');

var Smithy;
(function (Smithy) {
    (function (Lifecycle) {
        Lifecycle[Lifecycle["Singleton"] = 0] = "Singleton";
        Lifecycle[Lifecycle["Transient"] = 1] = "Transient";
    })(Smithy.Lifecycle || (Smithy.Lifecycle = {}));
    var Lifecycle = Smithy.Lifecycle;

    (function (TargetType) {
        TargetType[TargetType["Type"] = 0] = "Type";
        TargetType[TargetType["Instance"] = 1] = "Instance";
        TargetType[TargetType["Function"] = 2] = "Function";
    })(Smithy.TargetType || (Smithy.TargetType = {}));
    var TargetType = Smithy.TargetType;

    var Blacksmith = (function () {
        function Blacksmith(forge) {
            this.forge = forge;
        }
        Blacksmith.prototype.registerEquipment = function (equipment) {
            var _this = this;
            _.forEach(equipment, function (tool) {
                var binding;
                switch (tool.targetType) {
                    case 0 /* Type */:
                        binding = _this.forge.bind(tool.name).to.type(tool.target);
                        break;
                    case 2 /* Function */:
                        binding = _this.forge.bind(tool.name).to.function(tool.target);
                        break;
                    case 1 /* Instance */:
                        binding = _this.forge.bind(tool.name).to.instance(tool.target);
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

                if (tool.lifecycle === 1 /* Transient */) {
                    binding.transient();
                }
            });

            return this;
        };
        return Blacksmith;
    })();
    Smithy.Blacksmith = Blacksmith;

    (function (Tools) {
        var BaseTool = (function () {
            function BaseTool(name, target, args) {
                this.name = name;
                this.target = target;
                this.lifecycle = 0 /* Singleton */;

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
            return BaseTool;
        })();
        Tools.BaseTool = BaseTool;

        var Function = (function (_super) {
            __extends(Function, _super);
            function Function(name, target) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 2); _i++) {
                    args[_i] = arguments[_i + 2];
                }
                _super.call(this, name, target, args);
                this.name = name;
                this.target = target;

                this.targetType = 2 /* Function */;

                assert(_.isFunction(this.target), 'Target is required and must be a function');
            }
            return Function;
        })(BaseTool);
        Tools.Function = Function;

        var Instance = (function (_super) {
            __extends(Instance, _super);
            function Instance(name, target) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 2); _i++) {
                    args[_i] = arguments[_i + 2];
                }
                _super.call(this, name, target, args);
                this.name = name;
                this.target = target;

                this.targetType = 1 /* Instance */;
            }
            return Instance;
        })(BaseTool);
        Tools.Instance = Instance;

        var Type = (function (_super) {
            __extends(Type, _super);
            function Type(name, target) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 2); _i++) {
                    args[_i] = arguments[_i + 2];
                }
                _super.call(this, name, target, args);
                this.name = name;
                this.target = target;

                this.targetType = 0 /* Type */;

                assert(_.isFunction(this.target), 'Target is required and must be a function');
            }
            return Type;
        })(BaseTool);
        Tools.Type = Type;
    })(Smithy.Tools || (Smithy.Tools = {}));
    var Tools = Smithy.Tools;
})(Smithy || (Smithy = {}));

module.exports = Smithy;
//# sourceMappingURL=Smithy.js.map
