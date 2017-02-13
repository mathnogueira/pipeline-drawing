import { StallException } from '../stall';
import { RegisterController } from '../register-controller';
import { PipelineRegisters } from '../pipeline-register';
import { Instruction } from '../instructions/instruction';
import { FunctionalUnit } from './base';

export class EXunit extends FunctionalUnit {
	
    protected input: Object;
    protected output: Object;
    private cyclesLeft: number;
    private rd: string;
	
	constructor(registers: PipelineRegisters) {
		super(registers.ID_EX, registers.EX_MEM);
        this.cyclesLeft = undefined;
        this.rd = undefined;
	}

    public execute(regController?: RegisterController): void {
        if (!this.cyclesLeft)
            this.cyclesLeft = this.input["cost"];
        if (!this.rd)
            this.rd = this.input["rd"];
    }

    public tick(cycle: number): void {
        if (this.cyclesLeft === undefined) return;
        this.cyclesLeft -= 1;
        if (this.cyclesLeft === 0) {
            this.output["rd"] = this.rd;
        }
    }
}