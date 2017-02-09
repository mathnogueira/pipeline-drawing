import { FunctionalUnit } from './functional-units/base';
import { EStage, Instruction } from './instructions/instruction';
import { StructureHazardDetector } from './structure-hazard-detector';
import { RegisterController } from './register-controller';
export class InstructionExecuter {

	private regController: RegisterController;
	private structureController: StructureHazardDetector;
	private currentInstruction: Instruction;
	private free: boolean;
	private cyclesLeft: number = -1;

	constructor(regController: RegisterController, hazardDetector: StructureHazardDetector) {
		this.regController = regController;
		this.structureController = hazardDetector;
		this.free = true;
	}

	setInstruction(instruction: Instruction) {
		this.currentInstruction = instruction;
		this.free = false;
	}

	tick() {
		let stage: EStage = this.currentInstruction.stage;
		let unit: FunctionalUnit;
		switch(stage) {
			case EStage.IF:
				unit = this.structureController.useStructure("if", 1);
				this.currentInstruction.stage = EStage.ID;
				break;
			case EStage.ID:
				unit = this.structureController.useStructure("id", 1);
				this.currentInstruction.stage = EStage.EX;
				break;
			case EStage.EX:
				if (this.cyclesLeft === -1) {
					unit = this.structureController.useStructure(this.currentInstruction.exUnit, this.currentInstruction.delay);
					this.cyclesLeft = this.currentInstruction.delay;
				}
				this.cyclesLeft--;
				if (this.cyclesLeft === 0) {
					this.currentInstruction.stage = EStage.MEM;
				}
				break;
			case EStage.MEM:
				unit = this.structureController.useStructure("mem", 1);
				this.currentInstruction.stage = EStage.WB;
				break;
			case EStage.WB:
				unit = this.structureController.useStructure("wb", 1);
				this.currentInstruction.stage = EStage.FINISHED;
				this.free = true;
				break;
		}
		this.currentInstruction.tick();
	}

}