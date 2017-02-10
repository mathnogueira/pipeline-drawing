var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { EInstructionType, Instruction } from './instruction';
var RegisterInstruction = (function (_super) {
    __extends(RegisterInstruction, _super);
    function RegisterInstruction(statement) {
        var _this = _super.call(this, statement) || this;
        _this.type = EInstructionType.REGISTER;
        if (["addd", "subd"].indexOf(_this.name) >= 0)
            _this.exUnit = "fp_add";
        else if ("multd" == _this.name)
            _this.exUnit = "fp_mult";
        else if ("divd" == _this.name)
            _this.exUnit = "fp_div";
        else if (["add", "daddui", "subi"].indexOf(_this.name) >= 0)
            _this.exUnit = "int_add";
        else if ("mult" == _this.name)
            _this.exUnit = "int_mult";
        else
            _this.exUnit = "int_div";
        return _this;
    }
    RegisterInstruction.prototype.retrieveRegisters = function (args) {
        this.detinationRegister = args[1];
        this.operants = this.getOperants(args);
    };
    RegisterInstruction.prototype.getOperants = function (args) {
        var operants = new Array();
        operants = args.slice(2);
        return operants;
    };
    return RegisterInstruction;
}(Instruction));
export { RegisterInstruction };
