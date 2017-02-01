"use strict";

class Intruction {

	constructor() {
		this.isLoad = false;
		this.isSave = false;
		this.rd = "f0";
		this.operandos = ["f2"];
		this.numeroExecucoes = 4;
		this.inicio = 1;
	}
}


class Solver  {
	
	constructor(instructions, configuration) {
		this.instructions = instructions;
		this.configuration = configuration;
		this.currentCycle = 0;
	}

	solve(useForward) {
		
	}
}

module.exports = Solver;