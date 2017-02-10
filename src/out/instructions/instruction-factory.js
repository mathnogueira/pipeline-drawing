import { MemoryInstruction } from './memory-instruction';
import { BranchInstruction } from './branch-instruction';
import { RegisterInstruction } from './register-instruction';
var InstructionFactory = (function () {
    function InstructionFactory() {
    }
    InstructionFactory.build = function (statement) {
        var name = statement.split(" ")[0];
        var instruction = null;
        if (InstructionFactory.memInstructions.indexOf(name) >= 0) {
            instruction = new MemoryInstruction(statement);
        }
        else if (InstructionFactory.branchInstructions.indexOf(name) >= 0) {
            instruction = new BranchInstruction(statement);
        }
        else {
            instruction = new RegisterInstruction(statement);
        }
        return instruction;
    };
    return InstructionFactory;
}());
export { InstructionFactory };
InstructionFactory.memInstructions = ["l.d", "s.d", "lw", "sw"];
InstructionFactory.branchInstructions = ["beq", "bnez"];
