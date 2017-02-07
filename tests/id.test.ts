import { IFUnit } from '../src/ts/functional-units/if';
import { IDUnit } from '../src/ts/functional-units/id';
import { FunctionalUnit } from '../src/ts/functional-units/base';
import { Instruction } from '../src/ts/instructions/instruction';
import { suite, test } from 'mocha-typescript';

@suite("ID Unit")
class IDUnitTest {

	@test("should read a valid instruction from the input register")
	getInstructionFromInput() {
		let IF_ID: Object = {};
		let ID_EX: Object = {};
		let ifUnit: FunctionalUnit = new IFUnit({}, IF_ID);
		let unit: FunctionalUnit = new IDUnit(IF_ID, ID_EX);

	}

	@test("should set R0, R1 and R2 into rd, rs, rt respectively")
	getRegistersFromInstruction() {

	}
}