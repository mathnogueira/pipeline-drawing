import { Instruction } from '../instructions/instruction';
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

	public execute(instruction? : Instruction): void {
		this.currentInstruction = this.input["instruction"];
	}

	public tick(cycle: number): void {
		this.output["rd"] = this.currentInstruction.detinationRegister;
		this.output["rs"] = this.currentInstruction.operants[0];
		this.output["rt"] = this.currentInstruction.operants[1];
	}
}