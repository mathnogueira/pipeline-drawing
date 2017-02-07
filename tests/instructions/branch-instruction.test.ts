import { BranchInstruction } from '../../src/ts/instructions/branch-instruction';
import { Instruction } from '../../src/ts/instructions/instruction';
import { suite, test } from 'mocha-typescript';

@suite("BranchInstruction")
class BranchInstructionTest {

	@test("it should get r2 and r5 as operants")
	getRegisters() {
		let instruction: Instruction = new BranchInstruction("beq r2 r5 LOOP");
		if (instruction.operants.indexOf("r2") < 0 || instruction.operants.indexOf("r5") < 0) {
			throw new Error("r4 and r5 should be operants of the instruction.");
		}
	}

	@test("it should get r7 operant")
	getRegistersFromBnez() {
		let instruction: Instruction = new BranchInstruction("bnez r7 LOOP");
		if (instruction.operants.indexOf("r7") < 0) {
			throw new Error("r7 should be operant of the instruction.");
		}
	}

	@test("it should get null as destination")
	getDestination() {
		let instruction: Instruction = new BranchInstruction("beq r2 r5 LOOP");
		if (instruction.detinationRegister !== null) {
			throw new Error("Instruction should have null as destination register");
		}
	}

}