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
}