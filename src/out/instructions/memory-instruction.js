var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { EInstructionType, Instruction } from './instruction';
var MemoryInstruction = (function (_super) {
    __extends(MemoryInstruction, _super);
    function MemoryInstruction(statement) {
        var _this = _super.call(this, statement) || this;
        _this.type = EInstructionType.MEMORY;
        _this.exUnit = "int_add";
        return _this;
    }
    MemoryInstruction.prototype.retrieveRegisters = function (args) {
        this.detinationRegister = null;
        this.operants = this.getOperants(args);
    };
    MemoryInstruction.prototype.getOperants = function (args) {
        var operants = new Array();
        var rs = args[2].slice(args[2].indexOf("(") + 1).replace(")", "");
        operants.push(rs);
        operants.push(args[1]);
        return operants;
    };
    return MemoryInstruction;
}(Instruction));
export { MemoryInstruction };
