import { Stage } from "./components/stage";
import { Stall } from "./components/stall";
var Instruction = (function () {
    function Instruction(options) {
        this.text = options.instruction;
        this.execution = options.numberExecutions;
        this.stalls = options.stalls || [];
        this.unit = options.unit;
        this.exLabel = options.executionLabel || "X";
    }
    Instruction.prototype.createStages = function () {
        var stages = this._createStages();
        stages = this._addStalls(stages);
        return stages;
    };
    Instruction.prototype.createInstructionName = function (number) {
        return new fabric.Textbox(this.text, {
            fontSize: 12,
            top: 45 + 40 * number,
            left: 10,
            height: 40,
            width: 120
        });
    };
    Instruction.prototype._createStages = function () {
        var stages = [];
        stages.push(new Stage("I", 0, 0));
        stages.push(new Stage("D", 0, 0));
        for (var i = 0; i < this.execution; i++) {
            stages.push(new Stage(this.exLabel, 0, 0));
        }
        stages.push(new Stage("M", 0, 0));
        stages.push(new Stage("W", 0, 0));
        return stages;
    };
    Instruction.prototype._addStalls = function (stages) {
        var _stages = [];
        var stage = 0;
        var numberStages = stages.length + this.stalls.length;
        _stages.length = numberStages;
        for (var i = 0; i < this.stalls.length; i++) {
            _stages[this.stalls[i]] = new Stall("S");
        }
        for (var i = 0; i < numberStages; i++) {
            if (_stages[i] === undefined) {
                _stages[i] = stages[stage++];
            }
        }
        return _stages;
    };
    return Instruction;
}());
export { Instruction };
