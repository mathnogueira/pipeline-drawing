var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { FunctionalUnit } from './base';
var WBUnit = (function (_super) {
    __extends(WBUnit, _super);
    function WBUnit(registers) {
        return _super.call(this, registers.ID_EX, registers.EX_MEM) || this;
    }
    WBUnit.prototype.execute = function (regController) {
        // Não precisa fazer nada.
    };
    WBUnit.prototype.tick = function (cycle) {
    };
    return WBUnit;
}(FunctionalUnit));
export { WBUnit };
