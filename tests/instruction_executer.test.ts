import { Instruction, InstructionDelay } from '../src/ts/instructions/instruction';
import { InstructionFactory } from '../src/ts/instructions/instruction-factory';
import { PipelineRegisters } from '../src/ts/pipeline-register';
import { StructureHazardDetector } from '../src/ts/structure-hazard-detector';
import { RegisterController } from '../src/ts/register-controller';
import { InstructionExecuter } from '../src/ts/instruction_executer';
import { suite, test } from 'mocha-typescript';
@suite("InstructionExecuter")
class InstructionExecuterTest {

	@test("should have 6 stalls")
	shouldHave6Stall() {
		InstructionDelay.mult = 7;
		let pregs: PipelineRegisters = new PipelineRegisters();
		let reg: RegisterController = new RegisterController();
		let haz: StructureHazardDetector = new StructureHazardDetector(pregs);
		let ex1: InstructionExecuter = new InstructionExecuter(reg, haz);
		let ex2: InstructionExecuter = new InstructionExecuter(reg, haz);
		let stalls: number = 0;

		let inst1 = InstructionFactory.build("mult r0 r1 r2");
		let inst2 = InstructionFactory.build("mult r0 r1 r2");

		ex1.setInstruction(inst1);
		ex2.setInstruction(inst2);

		ex1.tick();

		reg.tick();
		haz.tick();
		
		ex1.tick();
		ex2.tick();

		reg.tick();
		haz.tick();

		ex1.tick();
		ex2.tick();

		reg.tick();
		haz.tick();

		for (let i = 0; i < 7; i++) {

			try {
				ex1.tick();
				ex2.tick();
			} catch (e) {
				stalls += 1;
			} finally {
				reg.tick();
				haz.tick();
			}
		}

		if (stalls != 6)
			throw new Error("Should have 6 stalls");
	}

	@test("Should have data hazard")
	testDataHazard() {
		InstructionDelay.mult = 3;
		InstructionDelay.subi = 2;
		let pregs: PipelineRegisters = new PipelineRegisters();
		let reg: RegisterController = new RegisterController();
		let haz: StructureHazardDetector = new StructureHazardDetector(pregs);
		let ex1: InstructionExecuter = new InstructionExecuter(reg, haz);
		let ex2: InstructionExecuter = new InstructionExecuter(reg, haz);
		let stalls: number = 0;

		let inst1 = InstructionFactory.build("mult r0 r1 r2");
		let inst2 = InstructionFactory.build("subi r2 r0 r1");

		ex1.setInstruction(inst1);
		ex2.setInstruction(inst2);

		// ciclo 1 (IF)
		ex1.tick();
		reg.tick();
		haz.tick();

		// ciclo 2 (ID/IF)
		ex1.tick();
		ex2.tick();
		reg.tick();
		haz.tick();

		// ciclo 3 (EX/ID)
		ex1.tick();
		ex2.tick();
		reg.tick();
		haz.tick();

		// ciclo 4 (EX/EX) ==> Tem que dar conflito!!
		for (let i = 0; i < 3; i++) {
			try {
				ex1.tick();
				ex2.tick();
			} catch (e) {
				stalls++;
			} finally {
				reg.tick();
				haz.tick();
			}
		}

		if (stalls != 3)
			throw new Error("Should have 3 stalls"); // (m2, m3, mem)
	}

	@test("should detect correct cycle for each unit")
	testCycleDetection() {
		InstructionDelay.mult = 3;
		InstructionDelay.subi = 2;
		let pregs: PipelineRegisters = new PipelineRegisters();
		let reg: RegisterController = new RegisterController();
		let haz: StructureHazardDetector = new StructureHazardDetector(pregs);
		let ex1: InstructionExecuter = new InstructionExecuter(reg, haz);
		let ex2: InstructionExecuter = new InstructionExecuter(reg, haz);
		let stalls: number = 0;

		let inst1 = InstructionFactory.build("mult r0 r1 r2");
		let inst2 = InstructionFactory.build("subi r2 r0 r1");

		ex1.setInstruction(inst1);
		ex2.setInstruction(inst2);

		// ciclo 1 (IF)
		ex1.tick(1);
		reg.tick();
		haz.tick();

		// ciclo 2 (ID/IF)
		ex1.tick(2);
		ex2.tick(2);
		reg.tick();
		haz.tick();

		// ciclo 3 (EX/ID)
		ex1.tick(3);
		ex2.tick(3);
		reg.tick();
		haz.tick();

		// ciclo 4 (EX/EX) ==> Tem que dar conflito!!
		for (let i = 0; i < 10; i++) {
			try {
				ex1.tick(4 + i);
				ex2.tick(4 + i);
			} catch (e) {
				stalls++;
			} finally {
				reg.tick();
				haz.tick();
			}
		}

		if (inst1.output["if"] != 1) throw new Error("if of inst1 should be 1");
		if (inst2.output["if"] != 2) throw new Error("if of inst2 should be 2");
		if (inst1.output["id"] != 2) throw new Error("id of inst1 should be 2");
		if (inst2.output["id"] != 3) throw new Error("id of inst2 should be 3");
		if (inst1.output["ex"] != 3) throw new Error("ex of inst1 should be 3");
		if (inst2.output["ex"] != 7) throw new Error("ex of inst2 should be 7");
		if (inst1.output["mem"] != 6) throw new Error("mem of inst1 should be 6");
		if (inst2.output["mem"] != 9) throw new Error("mem of inst2 should be 9");
		if (inst1.output["wb"] != 7) throw new Error("wb of inst1 should be 7");
		if (inst2.output["wb"] != 10) throw new Error("wb of inst2 should be 10");
	}

	@test("should detect correct cycle for each unit for 3 instructions")
	testCycleDetection3Instructions() {
		InstructionDelay.mult = 3;
		InstructionDelay.subi = 2;
		InstructionDelay.div = 20;
		let pregs: PipelineRegisters = new PipelineRegisters();
		let reg: RegisterController = new RegisterController();
		let haz: StructureHazardDetector = new StructureHazardDetector(pregs);
		let ex1: InstructionExecuter = new InstructionExecuter(reg, haz);
		let ex2: InstructionExecuter = new InstructionExecuter(reg, haz);
		let ex3: InstructionExecuter = new InstructionExecuter(reg, haz);
		let stalls: number = 0;

		let inst1 = InstructionFactory.build("mult r0 r1 r2");
		let inst2 = InstructionFactory.build("subi r2 r0 r1");
		let inst3 = InstructionFactory.build("div r0 r2 r0");

		ex1.setInstruction(inst1);
		ex2.setInstruction(inst2);
		ex3.setInstruction(inst3);

		// ciclo 1 (IF)
		ex1.tick(1);
		reg.tick();
		haz.tick();

		// ciclo 2 (ID/IF)
		ex1.tick(2);
		ex2.tick(2);
		reg.tick();
		haz.tick();

		// ciclo 3 (EX/ID)
		ex1.tick(3);
		ex2.tick(3);
		ex3.tick(3);
		reg.tick();
		haz.tick();

		// ciclo 4 (EX/EX) ==> Tem que dar conflito!!
		for (let i = 0; i < 100; i++) {
			try {
				ex1.tick(4 + i);
				ex2.tick(4 + i);
				ex3.tick(4 + i);
			} catch (e) {
				stalls++;
			} finally {
				reg.tick();
				haz.tick();
			}
		}

		if (inst1.output["if"] != 1) throw new Error("if of inst1 should be 1");
		if (inst2.output["if"] != 2) throw new Error("if of inst2 should be 2");
		if (inst1.output["id"] != 2) throw new Error("id of inst1 should be 2");
		if (inst2.output["id"] != 3) throw new Error("id of inst2 should be 3");
		if (inst1.output["ex"] != 3) throw new Error("ex of inst1 should be 3");
		if (inst2.output["ex"] != 7) throw new Error("ex of inst2 should be 7");
		if (inst1.output["mem"] != 6) throw new Error("mem of inst1 should be 6");
		if (inst2.output["mem"] != 9) throw new Error("mem of inst2 should be 9");
		if (inst1.output["wb"] != 7) throw new Error("wb of inst1 should be 7");
		if (inst2.output["wb"] != 10) throw new Error("wb of inst2 should be 10");
	}

}