"use strict";

import Canvas from "./drawing/canvas";
import PipelineTableComponent from "./drawing/components/pipeline-table.js";
import Instruction from "./drawing/instruction.js";

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
		// pipeline.addStage(new Stage("I", 0, 0));
		// pipeline.addStage(new Stage("D", 0, 1));
		// for (let i = 0; i < 7; i++) {
		// 	pipeline.addStage(new Stage("m", 0, 2 + i));
		// }
		// pipeline.addStage(new Stage("M", 0, 9));
		// pipeline.addStage(new Stage("W", 0, 10));

		// pipeline.addStage(new Stage("I", 1, 1));
		// pipeline.addStage(new Stage("D", 1, 2));
		// for (let i = 0; i < 7; i++) {
		// 	pipeline.addStage(new Stage("m", 1, 3 + i));
		// }
		// pipeline.addStage(new Stage("M", 1, 10));
		// pipeline.addStage(new Stage("W", 1, 11));
		canvas.initialize();
		canvas.add(pipeline);
		canvas.render();
	}

	function exportImage() {
		canvas.toImage();
	}
})();