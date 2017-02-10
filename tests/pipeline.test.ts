import { InstructionFactory } from '../src/ts/instructions/instruction-factory';
import { Instruction, InstructionDelay } from '../src/ts/instructions/instruction';
import { Pipeline } from '../src/ts/pipeline';
import { suite, test } from 'mocha-typescript';
@suite("Pipeline")
class PipelineTest {

	@test("Test output json")
	test() {
		console.log("TESTEEEEEEEEEEEEEEEEEEEEEEEEE");
		InstructionDelay.add = 3;
		InstructionDelay.subi = 3;
		InstructionDelay.div = 4;
		InstructionDelay.lw = 1;
		let strInstructions = [
			"add r1 r2 r3",
			"subi r1 r1 3",
			"div r1 r6 r7",
			"lw r6 0(r7)"
		];

		let instructions: Array<Instruction> = new Array<Instruction>();

		for (let i: number = 0; i < strInstructions.length; i++) {
			instructions.push(InstructionFactory.build(strInstructions[i]));
		}

		let pipeline: Pipeline = new Pipeline(instructions);
		pipeline.run();
	}

}