import { InstructionFactory } from './instructions/instruction-factory';
import { InstructionExecuter } from './instruction_executer';
import { Instruction } from './instructions/instruction';
import { FunctionalUnit } from './functional-units/base';
import { PipelineRegisters } from './pipeline-register';
import { StructureHazardDetector } from './structure-hazard-detector';
import { StallException } from './stall';
import { IUnit } from './IUnit';
import { RegisterController } from "./register-controller";

/**
 * Classe que controla a execução da pipeline e seus componentes internos. Considere essa classe como a unidade de controle do datapath.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export class Pipeline implements IUnit {

	private clock: number;
	private structureHazardDetector: StructureHazardDetector;
	private dataHazardDetector: RegisterController;
	private registers: PipelineRegisters;
	private executers: Array<InstructionExecuter>;
	private freeExecuters: number;
	private dispatchedInstructions: number;
	private finishedInstructions: number;

	constructor(instructions?: Array<string>) {
		let objInstructions: Array<Instruction> = new Array<Instruction>();
		for (let i = 0; i < instructions.length; i++) {
			objInstructions.push(InstructionFactory.build(instructions[i]));
		}
		this.clock = 1;
		this.dispatchedInstructions = 0;
		this.finishedInstructions = 0;
		this.registers = new PipelineRegisters();
		this.registers.INSTRUCTIONS = objInstructions;
		this.structureHazardDetector = new StructureHazardDetector(this.registers);
		this.dataHazardDetector = new RegisterController();
		this.executers = new Array<InstructionExecuter>();
	}

	/**
	 * Executa um tick de clock na pipeline. Essa função é responsável por realizar todas as 
	 * operações de transição entre um tick de clock e outro.
	 * 
	 */
	tick() :void {
		if (this.executers.length < 5 && this.dispatchedInstructions < this.registers.INSTRUCTIONS.length) {
			let executer: InstructionExecuter = 
				new InstructionExecuter(this.dataHazardDetector, this.structureHazardDetector, this.registers);
			executer.setInstruction(this.registers.INSTRUCTIONS[this.dispatchedInstructions]);
			this.registers.INSTRUCTIONS[this.dispatchedInstructions].dispatchedCycle = this.clock;
			this.dispatchedInstructions++;
			this.executers.push(executer);
		}
		this.executers.sort(function(a, b) {
			return a.currentInstruction.dispatchedCycle - a.currentInstruction.dispatchedCycle;
		});
		// let stalls = [];
		// for (let i: number = 0; i < this.executers.length; i++) {
		// 	try {
		// 		let canExecute: boolean = true;
		// 		for (let j = 0; j < stalls.length; j++) {
		// 			if (this.executers[i].currentInstruction.dispatchedCycle > stalls[j])
		// 				canExecute = false;
		// 		}
		// 		if (canExecute)
		// 			this.executers[i].tick(this.clock);
		// 	} catch (e) {
		// 		console.log(e.message, this.clock);
		// 		stalls.push(this.executers[i].currentInstruction.dispatchedCycle);
		// 	}
		// }
		let i: number = 0;
		try {
			for (; i < this.executers.length; i++) {
				let executer = this.executers[i];
				executer.tick(this.clock);
			}
		} catch (e) {
			for (; i < this.executers.length; i++) {
				// console.log(this.executers[i].currentInstruction.name);
				this.executers[i].currentInstruction.stalls.push(this.clock);
			}
		}
	}

	run() :Array<Object> {
		while (this.clock < 100) {
			this.tick();
			this.dataHazardDetector.tick();
			this.structureHazardDetector.tick();
			this.clock++;
		}

		// Output
		let output:Array<Object> = new Array<Object>();
		for (let i: number = 0; i < this.registers.INSTRUCTIONS.length; i++) {
			output.push(this.registers.INSTRUCTIONS[i].getOutput());
		}

		return output;
	}
}