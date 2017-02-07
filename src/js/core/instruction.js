"use strict";

import EType from "./enum_type.js";

class Instruction {

	/**
	 * Constroi uma nova instrução baseado na configuração passada.
	 * 
	 * @param options {object} objeto de configuração da instrução.
	 */
	constructor(options) {
		this.type = options.type;
		this.executionCycle = options.execution;
		this.destination = options.destination;
		this.operants = options.operants;
	}

	/**
	 * Define quando uma instrução estará pronta, caso ela não tenha nenhuma
	 * bolha em sua execução.
	 * 
	 * @return {int} número de ciclos que serão gastos pela instrução.
	 */
	getNumberCycles() {
		return this.executionCycle + 4;
	}

	/**
	 * Define quando que o dado de destino estará pronto para ser utilizado
	 * caso possa haver adiantamento.
	 * 
	 * @return {int} número de ciclos até que o valor de rd estiver disponível.
	 */
	getDestinationReadyCycle() {
		// Instruções de load demoram 1 ciclo a mais que as demais.
		let cyclePenality = +(this.type === EType.LOAD);
		return this.executionCycle + cyclePenality + 2;
	}

}

module.exports = Instruction;