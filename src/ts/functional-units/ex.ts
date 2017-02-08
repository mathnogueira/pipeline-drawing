import { StallException } from '../stall';
import { RegisterController } from '../register-controller';
import { PipelineRegisters } from '../pipeline-register';
import { Instruction } from '../instructions/instruction';
import { FunctionalUnit } from './base';

export class EXunit extends FunctionalUnit {
	
    protected input: Object;
    protected output: Object;
    private cyclesLeft: number;
	
	constructor(registers: PipelineRegisters) {
		super(registers.ID_EX, registers.EX_MEM);
	}

    public execute(regController?: RegisterController): void {
        let isReadable: boolean;
        let canExecute: boolean = true;
        this.cyclesLeft = this.input["cost"];
        // Reserva os registradores rs e rt para leitura
        if (this.input["rs"]) {
            isReadable = regController.isReadable("rs");
            if (!isReadable) {
                // Tenta adiantar rs
                canExecute = false;
            }
        }
        if (this.input["rt"]) {
            isReadable = regController.isReadable("rt");
            if (!isReadable) {
                // tenta adiantar rt
                canExecute = false;
            }
        }
        // Reserva o Rd para escrita
        if (this.input["rd"]) {
            regController.write(this.input["rd"], 5);
        }
        if (!canExecute) {
            // Se tudo for em vão, para a pipeline.
            throw new StallException();
        }
    }

    public tick(cycle: number): void {
        if (this.cyclesLeft === undefined) return;
        this.cyclesLeft -= 1;
        if (this.cyclesLeft === 0) {
            this.output["rd"] = this.input["rd"];
        }
    }
}