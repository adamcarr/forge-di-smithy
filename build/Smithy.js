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
            function BaseTool(options) {
                _.assign(this, options);

                if (_.isUndefined(this.lifecycle)) {
                    this.lifecycle = 0 /* Singleton */;
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
            return BaseTool;
        })();
        Tools.BaseTool = BaseTool;

        var Function = (function (_super) {
            __extends(Function, _super);
            function Function(options) {
                _super.call(this, options);

                this.targetType = 2 /* Function */;

                assert(_.isFunction(this.target), "'target' is required and must be a function");
            }
            return Function;
        })(BaseTool);
        Tools.Function = Function;

        var Instance = (function (_super) {
            __extends(Instance, _super);
            function Instance(options) {
                _super.call(this, options);

                this.targetType = 1 /* Instance */;
            }
            return Instance;
        })(BaseTool);
        Tools.Instance = Instance;

        var Type = (function (_super) {
            __extends(Type, _super);
            function Type(options) {
                _super.call(this, options);

                this.targetType = 0 /* Type */;

                assert(_.isFunction(this.target), "'target' is required and must be a function");
            }
            return Type;
        })(BaseTool);
        Tools.Type = Type;
    })(Smithy.Tools || (Smithy.Tools = {}));
    var Tools = Smithy.Tools;
})(Smithy || (Smithy = {}));

module.exports = Smithy;
//# sourceMappingURL=Smithy.js.map
