import { RegisterController } from '../register-controller';
import { PipelineRegisters } from '../pipeline-register';
import { Instruction } from '../instructions/instruction';
import { FunctionalUnit } from './base';

/**
 * Unidade funcional que decodifica a instrução a ser utilizada.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export class MemUnit extends FunctionalUnit {
	protected input: Object;
	protected output: Object;
	private currentInstruction: Instruction;
	private rd: string;

	constructor(registers: PipelineRegisters) {
		super(registers.EX_MEM, registers.MEM_WB);
	}

	public execute(regController?: RegisterController): void {
		this.rd = this.input["rd"];
	}

	public tick(cycle: number): void {
		this.output["rd"] = this.rd;
	}
}