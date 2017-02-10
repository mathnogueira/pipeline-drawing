export var EInstructionType;
(function (EInstructionType) {
    EInstructionType[EInstructionType["REGISTER"] = 1] = "REGISTER";
    EInstructionType[EInstructionType["MEMORY"] = 2] = "MEMORY";
    EInstructionType[EInstructionType["BRANCH"] = 3] = "BRANCH";
})(EInstructionType || (EInstructionType = {}));
export var EStage;
(function (EStage) {
    EStage[EStage["IF"] = 1] = "IF";
    EStage[EStage["ID"] = 2] = "ID";
    EStage[EStage["EX"] = 3] = "EX";
    EStage[EStage["MEM"] = 4] = "MEM";
    EStage[EStage["WB"] = 5] = "WB";
    EStage[EStage["FINISHED"] = 6] = "FINISHED";
})(EStage || (EStage = {}));
var Instruction = (function () {
    function Instruction(statement) {
        var splited = statement.split(" ");
        this.name = splited[0];
        this.retrieveRegisters(splited);
        this.stage = EStage.IF;
        this.delay = InstructionDelay[this.name];
        this.output = new Object();
    }
    Instruction.prototype.tick = function () {
    };
    return Instruction;
}());
export { Instruction };
var InstructionDelay = (function () {
    function InstructionDelay() {
    }
    return InstructionDelay;
}());
export { InstructionDelay };
InstructionDelay.addd = 1;
InstructionDelay.subd = 1;
InstructionDelay.multd = 1;
InstructionDelay.divd = 1;
InstructionDelay.ld = 1;
InstructionDelay.sd = 1;
InstructionDelay.add = 1;
InstructionDelay.daddui = 1;
InstructionDelay.subi = 1;
InstructionDelay.mult = 7;
InstructionDelay.div = 20;
InstructionDelay.lw = 1;
InstructionDelay.sw = 1;
InstructionDelay.beq = 1;
InstructionDelay.bnez = 1;
