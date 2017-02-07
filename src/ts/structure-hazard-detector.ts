import { IUnit } from './IUnit';
import { StallException } from './stall';
/**
 * Estrutura que detecta hazards estruturais no pipeline.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export class StructureHazardDetector implements IUnit {

	public defaultStructure: Object;
	private structure: Object;
	private cycles: Array<Array<number>>;

	/**
	 * Constroi a unidade de detecção de conflitos estruturais.
	 */
	constructor() {
		this.defaultStructure = new Object();
		this.cycles = new Array<Array<number>>();
		// Inicializa o numero de estruturas para cada 
		// Estruturas basicas
		this.defaultStructure["if"] = 1;
		this.defaultStructure["id"] = 1;
		this.defaultStructure["mem"] = 1;
		this.defaultStructure["wb"] = 1;

		// Estruturas de FP
		this.defaultStructure["fp_add"] = 1;
		this.defaultStructure["fp_mult"] = 1;
		this.defaultStructure["fp_div"] = 1;

		// Estruturas de INT
		this.defaultStructure["int_add"] = 1;
		this.defaultStructure["int_mult"] = 1;
		this.defaultStructure["int_div"] = 1;

		// Faz uma cópia do array para a estrutura
		this.structure = JSON.parse(JSON.stringify(this.defaultStructure));
	}

	/**
	 * Faz o uso de uma unidade funcional. Caso esta já esteja em uso, lança um erro para que 
	 * o pipeline possa ser parado (stall).
	 * 
	 * @param {string} structureName nome da estrutura que será usada.
	 * @param {number} cycles numero de ciclos em que a unidade estará ocupada.
	 * @throws {Error} quando a unidade não estiver disponível para o uso.
	 */
	useStructure(structureName: string, cycles: number = 1) :void {
		if (this.structure[structureName] === 0) {
			throw new StallException();
		}
		if (this.cycles[structureName] === undefined) {
			this.cycles[structureName] = new Array<number>();
		}
		this.structure[structureName] -= 1;
		this.cycles[structureName].push(cycles);
	}

	/**
	 * Executa um ciclo de clock e verifica se alguma unidade foi liberada. 
	 */
	tick() :void {
		for (let unit in this.cycles) {
			let cycles: Array<number> = this.cycles[unit];
			for (let index in cycles) {
				let cyclesLeft = cycles[index];
				if (cyclesLeft > 0) {
					cyclesLeft--;
					this.cycles[unit][index] = cyclesLeft;
					if (cyclesLeft === 0) {
						this.structure[unit] += 1;
					}
				}
			}
		}
	}
}