import { RegisterController } from '../register-controller';
import { PipelineRegisters } from '../pipeline-register';
import { Instruction } from '../instructions/instruction';
import { FunctionalUnit } from './base';

/**
 * Unidade funcional que recupera a proxima instrução a ser executada.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export class IFUnit extends FunctionalUnit {
	protected input: Object;
	protected output: Object;
	private currentInstruction: Instruction;
	private pc: number;

	constructor(registers: PipelineRegisters) {
		super(registers.INSTRUCTIONS, registers.IF_ID);
		this.pc = 0;
	}

	public execute(regController?: RegisterController): void {
		this.currentInstruction = this.input[this.pc];
	}

	public tick(cycle: number): void {
		this.output["instruction"] = this.currentInstruction;
		this.pc++;
	}
}