import { InstructionFactory } from '../src/ts/instructions/instruction-factory';
import { PipelineRegisters } from '../src/ts/pipeline-register';
import { IFUnit } from '../src/ts/functional-units/if';
import { IDUnit } from '../src/ts/functional-units/id';
import { FunctionalUnit } from '../src/ts/functional-units/base';
import { Instruction } from '../src/ts/instructions/instruction';
import { suite, test } from 'mocha-typescript';

@suite("ID Unit")
class IDUnitTest {

	@test("should set R0, R1 and R2 into rd, rs, rt respectively")
	getRegistersFromInstruction() {
		let registers: PipelineRegisters = new PipelineRegisters();
		let instruction: Instruction = InstructionFactory.build("add r0 r1 r2");
		let ifUnit: FunctionalUnit = new IFUnit(registers);
		let unit: FunctionalUnit = new IDUnit(registers);
		ifUnit.execute(instruction);
		ifUnit.tick();
		unit.execute(instruction);
		unit.tick();
		if (registers.ID_EX["rd"] != "r0") {
			throw new Error("r0 should be the destination register");
		}

		if (registers.ID_EX["rs"] != "r1") {
			throw new Error("r1 should be the rs register");
		}

		if (registers.ID_EX["rt"] != "r2") {
			throw new Error("r2 should be the rt register");
		}
	}

	@test("should set rt and rs as r4 r8 respectively")
	getRegistersFromMemoryInstruction() {
		let registers: PipelineRegisters = new PipelineRegisters();
		let instruction: Instruction = InstructionFactory.build("lw r4 0(r8)");
		let ifUnit: FunctionalUnit = new IFUnit(registers);
		let unit: FunctionalUnit = new IDUnit(registers);
		ifUnit.execute(instruction);
		ifUnit.tick();
		unit.execute(instruction);
		unit.tick();
		console.log(registers.ID_EX);
		if (registers.ID_EX["rd"] !== null) {
			throw new Error("rd should be null");
		}

		if (registers.ID_EX["rs"] != "r8") {
			throw new Error("r8 should be the rs register");
		}

		if (registers.ID_EX["rt"] != "r4") {
			throw new Error("r4 should be the rt register");
		}
	}
}