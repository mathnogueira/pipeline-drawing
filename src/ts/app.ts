import {Canvas} from "./drawing/canvas";
import {PipelineTableComponent} from "./drawing/components/pipeline-table.js";
import {Instruction} from "./drawing/instruction";
import {Pipeline} from "./pipeline";

(function() {

	// Inicializa o projeto quando a página estiver carregada.
	window.onload = init;
	window["exportImage"] = exportImage;

	let canvas;

	function init() {
		let textInstructions = [
			"add r1 r2 r3",
			"subi r1 r1 3",
			"div r1 r6 r7",
			"lw r6 0(r7)",
			"subi r1 r1 1",
			"mult r2 r2 r1",
			"subi r1 r1 1",
			"subi r1 r1 1",
			"subi r1 r1 1",
		];
		let pipelineExecutor = new Pipeline(textInstructions);
		let parsedInstructions = pipelineExecutor.run();
		let maxCycles: number = 0;
		for (let i: number = 0; i < parsedInstructions.length; i++) {
			let lastCycle = parsedInstructions[i]["wb"];
			if (lastCycle > maxCycles)
				maxCycles = lastCycle;
		}
		let pipeline = new PipelineTableComponent(maxCycles, parsedInstructions.length);
		canvas = new Canvas("pipeline", pipeline.width + 140, pipeline.height + 45);

		for (let i: number = 0; i < parsedInstructions.length; i++) {
			// Cria uma instrucao
			let instruction = new Instruction({
				instruction: textInstructions[i],
				execution: parsedInstructions[i],
				unit: "integer"
			});

			pipeline.addInstruction(instruction);
		}

		canvas.initialize();
		canvas.add(pipeline);
		canvas.render();
	}

	function exportImage() {
		canvas.toImage();
	}
})();