import {Canvas} from "./drawing/canvas";
import {PipelineTableComponent} from "./drawing/components/pipeline-table.js";
import {Instruction} from "./drawing/instruction";
import {Pipeline} from "./pipeline";
import {Main} from "./main";

(function() {

	// Inicializa o projeto quando a página estiver carregada.
	window.onload = init;
	window["exportImage"] = exportImage;

	let canvas;

	function init() {
		let allInstructions = JSON.stringify([
  			{ if: 1, id: 2, ex: 3, mem: 6, wb: 7, stalls: [] },
  			{ if: 2, id: 3, ex: 7, mem: 10, wb: 11, stalls: [ 4, 5, 6 ] },
  			{ if: 3, id: 7, ex: 8, mem: 12, wb: 13, stalls: [ 4, 5, 6 ] },
  			{ if: 7, id: 8, ex: 9, mem: 11, wb: 12, stalls: [ 4, 5, 6, 10 ] }
		]);
		let parsedInstructions = JSON.parse(allInstructions);
		let pipeline = new PipelineTableComponent();
		canvas = new Canvas("pipeline", 3000, 450);
		//DRAW STALLS FIRST
		for(var i = 0; i < parsedInstructions.length; i++){
			let stalls = new Instruction({
				stalls : parsedInstructions[i]["stalls"]
			});
		}
		//Get instructionName and instruction

		for(var i = 0; i < parsedInstructions.length; i++){
			let inst = new Instruction({
				instruction: "ADD $1, $2, $5",
				numberExecutions: parsedInstructions[i]["mem"] - parsedInstructions[i]["ex"],
				executionLabel: "A",
				stalls: parsedInstructions[i]["stalls"],
				unit: "integer",
				structure: parsedInstructions[i]

			});
			console.log(parsedInstructions[i]);
			pipeline.addInstruction(inst);
		}
		canvas.initialize();
		canvas.add(pipeline);
		canvas.render();
		/*
		let pipeline = new PipelineTableComponent();
		let add = new Instruction({
			instruction: "ADD $1, $2, $5",
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
		*/
	}

	function exportImage() {
		canvas.toImage();
	}
})();