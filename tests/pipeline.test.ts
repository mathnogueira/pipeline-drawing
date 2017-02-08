import { RegisterController } from '../src/ts/register-controller';
import { Instruction } from '../src/ts/instructions/instruction';
import { WBUnit } from '../src/ts/functional-units/wb';
import { MemUnit } from '../src/ts/functional-units/mem';
import { EXunit } from '../src/ts/functional-units/ex';
import { InstructionFactory } from '../src/ts/instructions/instruction-factory';
import { FunctionalUnit } from '../src/ts/functional-units/base';
import { IDUnit } from '../src/ts/functional-units/id';
import { PipelineRegisters } from '../src/ts/pipeline-register';
import { IFUnit } from '../src/ts/functional-units/if';
import { IUnit } from '../src/ts/IUnit';
import { suite, test } from 'mocha-typescript';

@suite("Pipeline")
class PipelineTest {

	@test("Pipeline registers should not be updated before the cycle tick")
	shouldNotUpdateRegisters() {
		let registers: PipelineRegisters = new PipelineRegisters();
		let ifUnit: FunctionalUnit = new IFUnit(registers);
		registers.INSTRUCTIONS = [InstructionFactory.build("add r1 r2 r3")];

		ifUnit.execute();
		if (registers.IF_ID["instruction"] !== undefined) {
			throw new Error("IF should not upload register before tick.");
		}
	}

	@test("Pipeline register should be updated after a tick")
	shouldUpdateRegistersOnTick() {
		let registers: PipelineRegisters = new PipelineRegisters();
		let controller: RegisterController = new RegisterController();
		registers.INSTRUCTIONS = [InstructionFactory.build("add r1 r2 r3")];
		let ifUnit: FunctionalUnit = new IFUnit(registers);
		let idUnit: FunctionalUnit = new IDUnit(registers);
		let exUnit: FunctionalUnit = new EXunit(registers);
		let memUnit: FunctionalUnit = new MemUnit(registers);
		let wbUnit: FunctionalUnit = new WBUnit(registers);

		ifUnit.execute();
		ifUnit.tick();
		if (!(registers.IF_ID["instruction"] instanceof Instruction)) {
			throw new Error("IF should put an instruction into IF/ID.");
		}
		idUnit.execute();
		idUnit.tick();
		if (registers.ID_EX["rd"] != "r1") {
			throw new Error("ID should put r1 as rd");
		}
		if (registers.ID_EX["rs"] != "r2") {
			throw new Error("ID should put r2 as rs");
		}
		if (registers.ID_EX["rt"] != "r3") {
			throw new Error("ID should put r3 as rt");
		}
		if (registers.ID_EX["cost"] === undefined) {
			throw new Error("ID should put a cost for the EX");
		}

		exUnit.execute(controller);
		exUnit.tick();
		if (registers.EX_MEM["rd"] != "r1") {
			throw new Error("EX should put r1 as rd");
		}

		memUnit.execute();
		memUnit.tick();
		if (registers.MEM_WB["rd"] != "r1") {
			throw new Error("MEM should put r1 as rd");
		}
	}

	@test("Should have a stall because because R3 is not readable")
	shouldAddStallBecauseOfR3() {
		let registers: PipelineRegisters = new PipelineRegisters();
		let controller: RegisterController = new RegisterController();
		registers.INSTRUCTIONS = [InstructionFactory.build("add r3 r1 r2"), InstructionFactory.build("add r3 r3 r3")];
		let ifUnit: FunctionalUnit = new IFUnit(registers);
		let idUnit: FunctionalUnit = new IDUnit(registers);
		let exUnit: FunctionalUnit = new EXunit(registers);
		let memUnit: FunctionalUnit = new MemUnit(registers);
		let wbUnit: FunctionalUnit = new WBUnit(registers);

		for (let i: number = 0; i < 2; i++) {
			ifUnit.execute();
			idUnit.execute();
			exUnit.execute(controller);
			memUnit.execute();
			wbUnit.execute();

			ifUnit.tick();
			idUnit.tick();
			exUnit.tick();
			memUnit.tick();
			wbUnit.tick();
			controller.tick();
		}
	}

}