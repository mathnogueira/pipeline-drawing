"use strict";

import Canvas from "./drawing/canvas";
import PipelineTableComponent from "./drawing/components/pipeline-table.js";
import Instruction from "./drawing/instruction.js";
import ExecutionTable from "./core/execution-table.js";

(function() {

	// Inicializa o projeto quando a página estiver carregada.
	window.onload = init;
	window.exportImage = exportImage;

	let canvas;

	function init() {
		let pipeline = new PipelineTableComponent();
		let add = new Instruction({
			instruction: "ADD $1, $2, $3",
			numberExecutions: 2,
			executionLabel: "A",
			stalls: [2, 3],
			unit: "integer"
		});

		let sub = new Instruction({
			instruction: "SUB $1, $2, $3",
			numberExecutions: 2,
			executionLabel: "A",
			stalls: [1, 2],
			unit: "integer"
		});

		let div = new Instruction({
			instruction: "DIV $7, $2, $3",
			numberExecutions: 20,
			executionLabel: "d",
			stalls: [0, 1],
			unit: "integer"
		});

		let mult = new Instruction({
			instruction: "MULT $1, $2, $3",
			numberExecutions: 7,
			executionLabel: "m",
			stalls: [0],
			unit: "integer"
		});
		canvas = new Canvas("pipeline", 3000, 450);
		pipeline.addInstruction(add);
		pipeline.addInstruction(sub);
		pipeline.addInstruction(div);
		pipeline.addInstruction(mult);
		canvas.initialize();
		canvas.add(pipeline);
		canvas.render();


		let executionTable = new ExecutionTable(false);
		let addInstruction = {
			start: 2,
			destination: "F0",
			operants: ["F1", "F2"],
			isLoad: false,
			isWrite: false,
			executionCycles: 2
		};

		let divInstruction = {
			start: 1,
			destination: "F0",
			operants: ["F1", "F2"],
			isLoad: false,
			isWrite: false,
			executionCycles: 5
		};

		let subInstruction = {
			start: 3,
			destination: "F1",
			operants: ["F0", "F2"],
			isLoad: false,
			isWrite: false,
			executionCycles: 2
		};

		executionTable.execute(divInstruction);
		executionTable.execute(addInstruction);
		executionTable.execute(subInstruction);
	}

	function exportImage() {
		canvas.toImage();
	}
})();