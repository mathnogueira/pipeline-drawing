var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { FunctionalUnit } from './base';
/**
 * Unidade funcional que recupera a proxima instrução a ser executada.
 *
 * @author Matheus Nogueira
 * @version 1.0
 */
var IFUnit = (function (_super) {
    __extends(IFUnit, _super);
    function IFUnit(registers) {
        var _this = _super.call(this, registers.INSTRUCTIONS, registers.IF_ID) || this;
        _this.pc = 0;
        return _this;
    }
    IFUnit.prototype.execute = function (regController) {
        this.currentInstruction = this.input[this.pc];
    };
    IFUnit.prototype.tick = function (cycle) {
        this.output["instruction"] = this.currentInstruction;
        this.pc++;
    };
    return IFUnit;
}(FunctionalUnit));
export { IFUnit };
