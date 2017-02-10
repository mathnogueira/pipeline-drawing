var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { InstructionDelay } from '../instructions/instruction';
import { FunctionalUnit } from './base';
/**
 * Unidade funcional que decodifica a instrução a ser utilizada.
 *
 * @author Matheus Nogueira
 * @version 1.0
 */
var IDUnit = (function (_super) {
    __extends(IDUnit, _super);
    function IDUnit(registers) {
        return _super.call(this, registers.IF_ID, registers.ID_EX) || this;
    }
    IDUnit.prototype.execute = function (regController) {
        this.currentInstruction = this.input["instruction"];
    };
    IDUnit.prototype.tick = function (cycle) {
        if (this.currentInstruction) {
            var operants = this.currentInstruction.operants;
            this.output["rd"] = this.currentInstruction.detinationRegister;
            if (operants.length > 0)
                this.output["rs"] = this.currentInstruction.operants[0];
            if (operants.length > 1)
                this.output["rt"] = this.currentInstruction.operants[1];
            this.output["cost"] = InstructionDelay[this.currentInstruction.name];
        }
        else {
            this.output["rd"] = "";
            this.output["rs"] = "";
            this.output["rt"] = "";
            this.output["cost"] = 0;
        }
    };
    return IDUnit;
}(FunctionalUnit));
export { IDUnit };
