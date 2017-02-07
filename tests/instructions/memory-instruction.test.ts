import { MemoryInstruction } from '../../src/ts/instructions/memory-instruction';
import { Instruction } from '../../src/ts/instructions/instruction';
import { suite, test } from 'mocha-typescript';

@suite("MemoryInstruction")
class MemoryInstructionTest {

	@test("it should get r0 and r2 as operants")
	getRegisters() {
		let instruction: Instruction = new MemoryInstruction("sw r0 0(r2)");
		if (instruction.operants.indexOf("r0") < 0 || instruction.operants.indexOf("r2") < 0) {
			throw new Error("r0 and r2 should be operants of the instruction.");
		}
	}

	@test("it should get null as destination")
	getDestination() {
		let instruction: Instruction = new MemoryInstruction("sw r0 0(r2)");
		if (instruction.detinationRegister !== null) {
			throw new Error("Memory instructions dont have destination register");
		}
	}

}