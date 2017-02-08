import { FunctionalUnit } from './functional-units/base';
import { PipelineRegisters } from './pipeline-register';
import { StructureHazardDetector } from './structure-hazard-detector';
import { StallException } from './stall';
import { IUnit } from './IUnit';
import { RegisterController } from "./register-controller";

/**
 * Classe que controla a execução da pipeline e seus componentes internos. Considere essa classe como a unidade de controle do datapath.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
class Pipeline implements IUnit {

	private clock :number;
	private instructions :any;
	private structureHazardDetector: StructureHazardDetector;
	private dataHazardDetector: RegisterController;

	constructor() {
		this.clock = 0;
	}

	/**
	 * Executa um tick de clock na pipeline. Essa função é responsável por realizar todas as 
	 * operações de transição entre um tick de clock e outro.
	 * 
	 */
	tick() :void {
		this.clock += 1;
	}

	run() :void {
		let cycle: number = 0;
		let instructionConfig: Object = new Object();
		instructionConfig["finished"] = 0;
		instructionConfig["total"] = 5;
		let max = 10;
		let registers: PipelineRegisters = new PipelineRegisters();
		while (instructionConfig["finished"] < instructionConfig["total"]) {
			try {
				let ifUnit = this.structureHazardDetector.useStructure("if", 1);
				let idUnit = this.structureHazardDetector.useStructure("id", 1);
				let memUnit = this.structureHazardDetector.useStructure("mem", 1);
				let wbUnit = this.structureHazardDetector.useStructure("wb", 1);
				let exUnit = this.structureHazardDetector.useStructure("asdasd", 213);
				
				ifUnit.execute();
				idUnit.execute();
				exUnit.execute();
				memUnit.execute();
				wbUnit.execute();

				ifUnit.tick();
				idUnit.tick();
				exUnit.tick();
				memUnit.tick();
				wbUnit.tick();
				this.structureHazardDetector.tick();
				instructionConfig["finished"]++;
			} catch (error) {
				if (error instanceof StallException) {
					// Bolha na pipeline, portanto, deve parar a execução.
				}
			} finally {
				cycle++;
			}
		}
	}
}