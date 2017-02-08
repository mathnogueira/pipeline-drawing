import { PipelineRegisters } from '../pipeline-register';
import { Instruction } from '../instructions/instruction';
import { FunctionalUnit } from './base';

export class EXunit extends FunctionalUnit {
	
    protected input: Object;
    protected output: Object;
	
	constructor(registers: PipelineRegisters) {
		super(registers.ID_EX, registers.EX_MEM);
	}

    public execute(instruction: Instruction): void {
        throw new Error('Not implemented yet.');
    }

    public tick(cycle: number): void {
        throw new Error('Not implemented yet.');
    }
}