"use strict";

class ExecutionTable {

	constructor(useForward) {
		this.$$table = [];
		this.$$busyRegisters = {};
		this.conflictStrategy = useForward ? this.solveWithForward : this.solveWithStall;
	}

	execute(instruction) {
		let conflictResult = [];
		instruction.finish = instruction.start + instruction.executionCycles + 2;
		let rawConflicts = this.solveRAW(instruction);
		let wawConflicts = this.solveWAW(instruction);
		let lastStallRAW = rawConflicts.length ? rawConflicts[rawConflicts.length - 1] : 0;
		let lastStallWAW = wawConflicts.length ? wawConflicts[wawConflicts.length - 1] : 0;
		conflictResult = lastStallRAW > lastStallWAW ? rawConflicts : wawConflicts;
		instruction.finish += conflictResult.length;
		// Adiciona operando fonte na tabela de registradores ocupados
		let dependency = this.$$busyRegisters[instruction.destination];
		if (!dependency || instruction.finish > dependency.finish) {
			this.$$busyRegisters[instruction.destination] = instruction;
		}
		console.log(`Instrucao vai executar do ${instruction.start} ate ${instruction.finish}`);
		if (conflictResult.length) {
			console.log(`Stalls start at ${conflictResult[0]} and goes till ${conflictResult[conflictResult.length -1]}`);
		}
	}

	solveRAW(instruction) {
		let conflictResult = [];
		// Verifica se os operandos fonte estão sendo usados por outra instrução como RD
		for (let i = 0; i < instruction.operants.length; i++) {
			let operant = instruction.operants[i];
			let dependency = this.$$busyRegisters[operant];
			if (dependency) {
				let result = this.conflictStrategy(instruction, dependency);
				if (result.length > conflictResult.length) {
					conflictResult = result;
				}
			}
		}

		return conflictResult;
	}

	solveWAW(instruction) {
		let conflictResult = [];
		let destinationDependency = this.$$busyRegisters[instruction.destination];
		if (destinationDependency) {
			for (let i = 2; i <= destinationDependency.finish - instruction.executionCycles; i++) {
				conflictResult.push(i);
			}
		}
		return conflictResult;
	}

	solveWithStall(instruction, dependency) {
		let whenDataIsReady = dependency.start + dependency.executionCycles + 2;
		let stalls = [];
		for (let i = instruction.start + 1; i <= whenDataIsReady; i++) {
			stalls.push(i);
		}
		return stalls;
	}

	solveWithForward(instruction, dependency) {

	}

}

module.exports = ExecutionTable;