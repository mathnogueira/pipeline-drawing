import { RegisterInstruction } from '../../src/ts/instructions/register-instruction';
import { MemoryInstruction } from '../../src/ts/instructions/memory-instruction';
import { Instruction } from '../../src/ts/instructions/instruction';
import { suite, test } from 'mocha-typescript';

@suite("RegisterInstruction")
class RegisterInstructionTest {

	@test("it should get r4 and r5 as operants")
	getRegisters() {
		let instruction: Instruction = new RegisterInstruction("add.d r2 r4 r5");
		if (instruction.operants.indexOf("r4") < 0 || instruction.operants.indexOf("r5") < 0) {
			throw new Error("r4 and r5 should be operants of the instruction.");
		}
	}

	@test("it should get r2 as destination")
	getDestination() {
		let instruction: Instruction = new RegisterInstruction("add.d r2 r4 r5");
		if (instruction.detinationRegister !== "r2") {
			throw new Error("Instruction should have r2 as destination register");
		}
	}

}