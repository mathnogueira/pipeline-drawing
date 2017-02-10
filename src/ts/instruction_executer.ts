import { PipelineRegisters } from './pipeline-register';
import { StallException } from './stall';
import { FunctionalUnit } from './functional-units/base';
import { EStage, Instruction } from './instructions/instruction';
import { StructureHazardDetector } from './structure-hazard-detector';
import { RegisterController } from './register-controller';
export class InstructionExecuter {

	private regController: RegisterController;
	private structureController: StructureHazardDetector;
	private pipelineRegisters: PipelineRegisters;
	private currentInstruction: Instruction;
	private free: boolean;
	private cyclesLeft: number = -1;
	private rdReserved: string = null;
	private unit: FunctionalUnit;

	constructor(regController: RegisterController, hazardDetector: StructureHazardDetector, pipelineRegisters?:PipelineRegisters) {
		this.regController = regController;
		this.structureController = hazardDetector;
		this.pipelineRegisters = pipelineRegisters;
		this.free = true;
	}

	setInstruction(instruction: Instruction) {
		this.currentInstruction = instruction;
		this.free = false;
	}

	tick(cycle?: number) {
		let stage: EStage = this.currentInstruction.stage;
		switch(stage) {
			case EStage.IF:
				this.currentInstruction.output["if"] = cycle;
				this.unit = this.structureController.useStructure("if", 1);
				this.currentInstruction.stage = EStage.ID;
				break;
			case EStage.ID:
				this.currentInstruction.output["id"] = cycle;
				this.unit = this.structureController.useStructure("id", 1);
				this.currentInstruction.stage = EStage.EX;
				break;
			case EStage.EX:
				if (this.cyclesLeft === -1) {
					this.currentInstruction.output["ex"] = cycle;
					this.unit = this.structureController.useStructure(this.currentInstruction.exUnit, this.currentInstruction.delay);
					this.cyclesLeft = this.currentInstruction.delay;
				}
				try {
					// tenta ler os operandos
					this.executeInstruction();
				} catch (e) {
					this.currentInstruction.output["ex"] = cycle+1;
					throw e;
				}
				this.cyclesLeft--;
				if (this.cyclesLeft === 0) {
					this.currentInstruction.stage = EStage.MEM;
				}
				break;
			case EStage.MEM:
				this.currentInstruction.output["mem"] = cycle;
				this.unit = this.structureController.useStructure("mem", 1);
				this.currentInstruction.stage = EStage.WB;
				break;
			case EStage.WB:
				this.currentInstruction.output["wb"] = cycle;
				this.unit = this.structureController.useStructure("wb", 1);
				this.currentInstruction.stage = EStage.FINISHED;
				this.free = true;
				break;
		}
		this.currentInstruction.tick();
		if (this.unit) {
			this.unit.execute();
			this.unit.tick();
			console.log(cycle);
		}
	}

	executeInstruction() {
		// tenta ler os operandos fonte
		for (let i = 0; i < this.currentInstruction.operants.length; i++) {
			if (!this.regController.isReadable(this.currentInstruction.operants[i]) &&
				 this.currentInstruction.operants[i] != this.rdReserved) {
				// Tem que soltar uma bolha ou tentar o adiantamento.
				// ADIANTAMENTO:
				// USAR O this.pipelineRegisters para verificar quais registradores
				// estao em qual etapa da execucao. Aplicar o algoritmo do slide.
				// bolha
				throw new StallException();
			}
		}
		if (!this.rdReserved) {
			// Reserva o rd por delay + 1 ciclos (ex + mem)
			this.regController.write(this.currentInstruction.detinationRegister, this.currentInstruction.delay + 1);
			this.rdReserved = this.currentInstruction.detinationRegister;
		}
	}

}