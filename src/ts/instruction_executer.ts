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
	public currentInstruction: Instruction;
	private free: boolean;
	private cyclesLeft: number = -1;
	private rdReserved: string = null;
	private unit: FunctionalUnit;
	private forward: boolean;

	constructor(regController: RegisterController, hazardDetector: StructureHazardDetector, pipelineRegisters?:PipelineRegisters, forward?:boolean) {
		this.regController = regController;
		this.structureController = hazardDetector;
		this.pipelineRegisters = pipelineRegisters;
		this.forward = forward;
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
					// Nao executou nenhum ciclo ainda
					if (this.cyclesLeft == this.currentInstruction.delay)
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
		}
	}

	executeInstruction() {
		// Verifica se a instrucao pode escrever no rd.
		let currentExecuter = this.regController.getExecutingInstruction(this.currentInstruction.detinationRegister);
		if (!this.regController.isReadable(this.currentInstruction.detinationRegister) && 
			currentExecuter != this.currentInstruction && 
			currentExecuter.dispatchedCycle < this.currentInstruction.dispatchedCycle) {
			console.log("STALL");	
			throw new StallException("conflito de dados no " + this.currentInstruction.detinationRegister);
		}
		// tenta ler os operandos fonte
		for (let i = 0; i < this.currentInstruction.operants.length; i++) {
			let operant = this.currentInstruction.operants[i];
			// Se o registrador estiver sob uso.
			if (!this.regController.isReadable(operant)) {
				// A instrucao atual nao esta usando o registrador como RD
				let currentExecuter = this.regController.getExecutingInstruction(operant);
				if (currentExecuter != this.currentInstruction && 
					currentExecuter.dispatchedCycle < this.currentInstruction.dispatchedCycle) {
				// if(operant != this.rdReserved) {
					// Tem que soltar uma bolha ou tentar o adiantamento.
					// ADIANTAMENTO:
					// 1. EX/MEM hazard:
     				/*
     							if (EX/MEM.RegWrite
     							and (EX/MEM.RegisterRd != 0)
     							and (EX/MEM.RegisterRd = ID/EX.RegisterRs))
     								ForwardA = 10

								if (EX/MEM.RegWrite
								and (EX/MEM.RegisterRd != 0)
								and (EX/MEM.RegisterRd = ID/EX.RegisterRt))
									ForwardB = 10
								
						2. MEM/WB hazard:
								If (MEM/WB.RegWrite
								and (MEM/WB.RegisterRd != 0)
								and (EX/MEM.RegRd != ID/EX.REgRs)
								and (MEM/WB.RegisterRd = ID/EX.RegisterRs))
									ForwardA = 01
								if (MEM/WB.RegWrite
								and (MEM/WB.RegisterRd != 0)
								and (EX/MEM.RegRd != ID/EX.REgRt)
								and (MEM/WB.RegisterRd = ID/EX.RegisterRt))
									ForwardB = 01
					*/
					// USAR O this.pipelineRegisters para verificar quais registradores
					// estao em qual etapa da execucao. Aplicar o algoritmo do slide.
					// bolha
					console.log("Registrador RD EX_MEM: "+ this.pipelineRegisters.EX_MEM["rd"]+ " Registrador RS ID_EX: "+ this.pipelineRegisters.ID_EX["rs"]+ " Registrador RT ID_EX: "+ this.pipelineRegisters.ID_EX["rt"]);
					if(this.pipelineRegisters.EX_MEM["rd"] == this.pipelineRegisters.ID_EX["rs"] && this.pipelineRegisters.EX_MEM["rd"] !== undefined){
							//FowardA = 10
							console.log("ADIANTAMENTO: EX_MEM RD PRA ID_EX RS");
					}
					else if(this.pipelineRegisters.EX_MEM["rd"] == this.pipelineRegisters.ID_EX["rt"] && this.pipelineRegisters.EX_MEM["rd"] !== undefined){
							//FowardB = 10
							console.log("ADIANTAMENTO: EX_MEM RD PRA ID_EX RT");
							
					}
					console.log("Registrador RD MEM_WB: "+ this.pipelineRegisters.MEM_WB["rd"]+ " Registrador RS ID_EX: "+ this.pipelineRegisters.ID_EX["rs"]+ " Registrador RT ID_EX: "+ this.pipelineRegisters.ID_EX["rt"]);
					if(this.pipelineRegisters.EX_MEM["rd"] != this.pipelineRegisters.ID_EX["rs"] && this.pipelineRegisters.EX_MEM["rd"] == this.pipelineRegisters.ID_EX["rs"] && this.pipelineRegisters.MEM_WB["rd"] !== undefined){
							//FowardA = 01
							console.log("FowardA 01");
							
					}
					else if(this.pipelineRegisters.EX_MEM["rd"] != this.pipelineRegisters.ID_EX["rt"] && this.pipelineRegisters.EX_MEM["rd"] == this.pipelineRegisters.ID_EX["rt"] && this.pipelineRegisters.MEM_WB["rd"] !== undefined){
							//FowardB = 01
							console.log("FowardB 01");
							
					}
					
					// Verifica as condições de adiantamento, caso este recurso esteja disponível.
					if (this.forward) {
						let canForwardData = this.tryDataForward(operant);
						if (canForwardData) {
							continue;
						}
					}
					throw new StallException("conflito de dados no " + operant);
				}
			}
		}
		if (!this.rdReserved) {
			// Reserva o rd por delay + 1 ciclos (ex + mem)
			this.regController.write(this.currentInstruction.detinationRegister, this.currentInstruction.delay + 1, this.currentInstruction);
			this.rdReserved = this.currentInstruction.detinationRegister;
		}
	}

	private tryDataForward(register): boolean {
		// Eu sei que o codigo ta zuado, era so pra teste.
		// Fazer verificação de adiantamento aqui!
		if (this.pipelineRegisters.EX_MEM["rd"] == register)
			return true;
		if (this.pipelineRegisters.MEM_WB["rd"] == register)
			return true;
		return false;
	}

	haveFinished() {
		return this.free;
	}
}