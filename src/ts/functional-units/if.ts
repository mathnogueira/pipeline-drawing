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

	public execute(instruction? : Instruction): void {
		this.currentInstruction = instruction;
	}

	public tick(cycle: number): void {
		this.output["instruction"] = this.currentInstruction;
	}
}