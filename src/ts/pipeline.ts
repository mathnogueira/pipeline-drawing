import { StallException } from './stall';
import { IUnit } from './IUnit';
/**
 * Classe que controla a execução da pipeline e seus componentes internos. Considere essa classe como a unidade de controle do datapath.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
class Pipeline implements IUnit {

	private clock :number;
	private instructions :any;

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
		let max = 10;
		while (cycle < max) {
			try {

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