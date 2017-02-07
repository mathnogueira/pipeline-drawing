import { MemoryInstruction } from '../src/ts/instructions/memory-instruction';
import { Instruction } from '../src/ts/instructions/instruction';
import { IFUnit } from '../src/ts/functional-units/if';
import { IFunctionalUnit } from '../src/ts/IUnit';
import { suite, test } from 'mocha-typescript';

@suite("IF Unit")
class IFUnitTest {

	@test("should spill the next instruction when a tick is given")
	getInstructionFromTick() {
		let IF_ID: Object = {};
		let unit: IFunctionalUnit = new IFUnit({}, IF_ID);
		let instruction: Instruction = new MemoryInstruction("sw r0 0(r2)");
		unit.execute(instruction);
		unit.tick();
		if (IF_ID["instruction"] !== instruction) {
			throw new Error("IF should set instruction inside IF/ID register after a tick");
		}
	}

}