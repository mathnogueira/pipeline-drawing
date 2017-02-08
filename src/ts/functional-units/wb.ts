import { RegisterController } from '../register-controller';
import { PipelineRegisters } from '../pipeline-register';
import { Instruction } from '../instructions/instruction';
import { FunctionalUnit } from './base';

export class WBUnit extends FunctionalUnit {
	
    protected input: Object;
    protected output: Object;
	
	constructor(registers: PipelineRegisters) {
		super(registers.ID_EX, registers.EX_MEM);
	}

    public execute(regController?: RegisterController): void {
        // Não precisa fazer nada.
    }

    public tick(cycle: number): void {
        
    }
}