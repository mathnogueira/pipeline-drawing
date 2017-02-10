var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from "./component";
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage(text, instruction, cycle) {
        var _this = _super.call(this, 0, 0, 45, 40) || this;
        _this.instruction = instruction;
        _this.cycle = cycle;
        _this.text = text;
        _this.color = "#aaddaa";
        return _this;
    }
    Stage.prototype.build = function () {
        var box = new fabric.Rect({
            top: 30 + (this.instruction * this.height),
            left: 120 + (this.cycle * this.width),
            stroke: "#555",
            strokeWidth: 2,
            width: this.width,
            height: this.height,
            fill: this.color,
            evented: false,
            selectable: false
        });
        var text = new fabric.Textbox(this.text, {
            fontSize: 25,
            top: 37 + (this.height * this.instruction),
            left: 144 + (this.width * this.cycle),
            originX: "center"
        });
        return [box, text];
    };
    return Stage;
}(Component));
export { Stage };
