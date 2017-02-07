import { MemoryInstruction } from './memory-instruction';
import { BranchInstruction } from './branch-instruction';
import { RegisterInstruction } from './register-instruction';
import { Instruction } from './instruction';

export class InstructionFactory {

	static memInstructions: Array<string> = ["l.d", "s.d", "lw", "sw"];
	static branchInstructions: Array<string> = ["beq", "bnez"];

	public static build(statement: string) : Instruction {
		let name = statement.split(" ")[0];
		let instruction: Instruction = null;
		if (InstructionFactory.memInstructions.indexOf(name) >= 0) {
			instruction = new MemoryInstruction(statement);
		} else if (InstructionFactory.branchInstructions.indexOf(name) >= 0) {
			instruction = new BranchInstruction(statement);
		} else {
			instruction = new RegisterInstruction(statement);
		}
		return instruction;
	}
}