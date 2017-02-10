var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from "./component";
var PipelineTableComponent = (function (_super) {
    __extends(PipelineTableComponent, _super);
    function PipelineTableComponent() {
        var _this = _super.call(this, 10, 10, 900, 400) || this;
        _this.$$cycles = 0;
        _this.objects = [];
        _this.currentInstruction = 0;
        _this.currentCycle = 0;
        _this.instructions = [];
        return _this;
    }
    PipelineTableComponent.prototype.addStage = function (component) {
        var built = component.build();
        if (Array.isArray(built)) {
            for (var i = 0; i < built.length; i++) {
                this.objects.push(built[i]);
            }
        }
        else {
            this.objects.push(built);
        }
    };
    PipelineTableComponent.prototype.addInstructionName = function (instruction) {
        this.objects.push(instruction.createInstructionName(this.currentInstruction));
    };
    PipelineTableComponent.prototype.addInstruction = function (instruction) {
        var stages = instruction.createStages();
        for (var i = 0; i < stages.length; i++) {
            stages[i].instruction = this.currentInstruction;
            stages[i].cycle = this.currentCycle + i;
            this.addStage(stages[i]);
        }
        this.addInstructionName(instruction);
        this.currentInstruction++;
        this.currentCycle++;
        var totalAux = this.currentCycle + stages.length;
        if (totalAux > this.$$cycles) {
            this.$$cycles = totalAux;
        }
    };
    PipelineTableComponent.prototype.build = function () {
        this.width = 45 * (this.$$cycles - 1);
        console.log(this.width);
        var objects = this.objects;
        // Desenha as linhas separadores do clock
        this.drawClocks(this.$$cycles, objects);
        this.drawInstructions(10, objects);
        this.drawTableHeaders(objects);
        this.drawTableContent(objects);
        return new fabric.Group(objects, {
            top: this.y,
            left: this.x
        });
    };
    PipelineTableComponent.prototype.drawTableContent = function (objects) {
        var tableContent = new fabric.Rect({
            top: 30,
            left: 120,
            stroke: "#555",
            strokeWidth: 2,
            width: this.width,
            height: this.height,
            fill: "transparent",
            evented: false,
            selectable: false
        });
        objects.push(tableContent);
    };
    PipelineTableComponent.prototype.drawTableHeaders = function (objects) {
        // Clock number place
        var clockHolder = new fabric.Rect({
            top: 0,
            left: 120,
            stroke: "#555",
            strokeWidth: 2,
            width: this.width,
            height: 30,
            fill: "transparent",
            evented: false,
            selectable: false
        });
        // Instructions name holder
        var instructionHolder = new fabric.Rect({
            top: 30,
            left: 0,
            stroke: "#555",
            strokeWidth: 2,
            width: 120,
            height: this.height,
            fill: "transparent",
            evented: false,
            selectable: false
        });
        objects.push(instructionHolder);
        objects.push(clockHolder);
    };
    PipelineTableComponent.prototype.drawClocks = function (numberClocks, objects) {
        var width = 45;
        for (var i = 1; i < numberClocks; i++) {
            console.log(i);
            var line = new fabric.Line([0, 0, 0, this.height + 30], {
                top: 0,
                left: 120 + width * i,
                stroke: "#888"
            });
            objects.push(line);
        }
        for (var i = 1; i < numberClocks; i++) {
            var padded = i < 10 ? "0" + i : "" + i;
            var text = new fabric.Textbox(padded, {
                fontSize: 12,
                top: 10,
                left: 157 + 45 * (i - 1),
                height: 30,
                width: 45,
                originX: "center"
            });
            objects.push(text);
        }
    };
    PipelineTableComponent.prototype.drawInstructions = function (numberInstructions, arr) {
        var height = this.height / numberInstructions;
        for (var i = 1; i < numberInstructions; i++) {
            var line = new fabric.Line([0, 0, this.width + 120, 0], {
                top: 30 + height * i,
                left: 0,
                stroke: "#888"
            });
            arr.push(line);
        }
    };
    return PipelineTableComponent;
}(Component));
export { PipelineTableComponent };
