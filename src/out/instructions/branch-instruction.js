var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { EInstructionType, Instruction } from './instruction';
var BranchInstruction = (function (_super) {
    __extends(BranchInstruction, _super);
    function BranchInstruction(statement) {
        var _this = _super.call(this, statement) || this;
        _this.type = EInstructionType.BRANCH;
        _this.exUnit = "int_add";
        return _this;
    }
    BranchInstruction.prototype.retrieveRegisters = function (args) {
        this.detinationRegister = null;
        this.operants = this.getOperants(args);
    };
    BranchInstruction.prototype.getOperants = function (args) {
        var operants = new Array();
        if (this.name == "beq") {
            operants = args.slice(1, 3);
        }
        else {
            operants = args.slice(1, 2);
        }
        return operants;
    };
    return BranchInstruction;
}(Instruction));
export { BranchInstruction };
