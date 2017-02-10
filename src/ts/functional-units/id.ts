import { StallException } from '../stall';
import { RegisterController } from '../register-controller';
import { PipelineRegisters } from '../pipeline-register';
import { Instruction, InstructionDelay } from '../instructions/instruction';
import { FunctionalUnit } from './base';

/**
 * Unidade funcional que decodifica a instrução a ser utilizada.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export class IDUnit extends FunctionalUnit {
	protected input: Object;
	protected output: Object;
	private currentInstruction: Instruction;

	constructor(registers: PipelineRegisters) {
		super(registers.IF_ID, registers.ID_EX);
	}

	public execute(regController?: RegisterController): void {
		this.currentInstruction = this.input["instruction"];
	}

	public tick(cycle: number): void {
		if (this.currentInstruction) {
			let operants = this.currentInstruction.operants;
			this.output["rd"] = this.currentInstruction.detinationRegister;
			if (operants.length > 0)
				this.output["rs"] = this.currentInstruction.operants[0];
			if (operants.length > 1)
				this.output["rt"] = this.currentInstruction.operants[1];
			this.output["cost"] = InstructionDelay[this.currentInstruction.name];
		} else {
			this.output["rd"] = "";
			this.output["rs"] = "";
			this.output["rt"] = "";
			this.output["cost"] = 0;
		}
	}
}