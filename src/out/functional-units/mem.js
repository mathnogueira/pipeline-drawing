var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { FunctionalUnit } from './base';
/**
 * Unidade funcional que decodifica a instrução a ser utilizada.
 *
 * @author Matheus Nogueira
 * @version 1.0
 */
var MemUnit = (function (_super) {
    __extends(MemUnit, _super);
    function MemUnit(registers) {
        return _super.call(this, registers.EX_MEM, registers.MEM_WB) || this;
    }
    MemUnit.prototype.execute = function (regController) {
        this.rd = this.input["rd"];
    };
    MemUnit.prototype.tick = function (cycle) {
        this.output["rd"] = this.rd;
    };
    return MemUnit;
}(FunctionalUnit));
export { MemUnit };
