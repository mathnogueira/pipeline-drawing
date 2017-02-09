import { InstructionDelay } from '../src/ts/instructions/instruction';
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

}