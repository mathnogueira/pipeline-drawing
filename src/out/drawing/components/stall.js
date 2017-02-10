var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Stage } from "./stage";
var Stall = (function (_super) {
    __extends(Stall, _super);
    function Stall(instruction, cycle) {
        var _this = _super.call(this, "S", instruction, cycle) || this;
        _this.color = "#ff0000";
        return _this;
    }
    return Stall;
}(Stage));
export { Stall };
