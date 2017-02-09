import { InstructionFactory } from '../../src/ts/instructions/instruction-factory';
import { Instruction, InstructionDelay } from '../../src/ts/instructions/instruction';
import { suite, test } from 'mocha-typescript';
@suite("Instruction")
class InstructionTest {

	@test("should have delay = 3")
	shouldHaveDelay3() {
		InstructionDelay.addd = 3;
		let instruction: Instruction = InstructionFactory.build("addd r0 r1 r3");
		if (instruction.delay != 3)
			throw new Error("Delay should be 3");
		InstructionDelay.addd = 1;
	}

}