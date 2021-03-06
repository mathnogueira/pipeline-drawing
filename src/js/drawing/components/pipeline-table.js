"use strict";

import Component from "./component.js";

class PipelineTableComponent extends Component {

	constructor() {
		super(10, 10, 900, 400);
		this.$$cycles = 0;
		this.objects = [];
		this.currentInstruction = 0;
		this.currentCycle = 0;
		this.instructions = [];
	}

	addStage(component) {
		let built = component.build();
		if (Array.isArray(built)) {
			for (let i = 0; i < built.length; i++) {
				this.objects.push(built[i]);
			}
		} else {
			this.objects.push(built);
		}
	}

	addInstructionName(instruction) {
		this.objects.push(instruction.createInstructionName(this.currentInstruction));
	}

	addInstruction(instruction) {
		let stages = instruction.createStages();
		for (let i = 0; i < stages.length; i++) {
			stages[i].instruction = this.currentInstruction;
			stages[i].cycle = this.currentCycle + i;
			this.addStage(stages[i]);
		}
		this.addInstructionName(instruction);
		this.currentInstruction++;
		this.currentCycle++;

		let totalAux = this.currentCycle + stages.length;
		if (totalAux > this.$$cycles) {
			this.$$cycles = totalAux;
		}
	}

	build() {
		this.width = 45 * (this.$$cycles-1);
		console.log(this.width);
		let objects = this.objects;
		// Desenha as linhas separadores do clock
		this.drawClocks(this.$$cycles, objects);
		this.drawInstructions(10, objects);
		this.drawTableHeaders(objects);
		this.drawTableContent(objects);

		return new fabric.Group(objects, {
			top: this.y,
			left: this.x,
		});
	}

	drawTableContent(objects) {
		let tableContent = new fabric.Rect({
			top: 30,
			left: 120,
			stroke: "#555",
			strokeWidth: 2,
			width: this.width,
			height: this.height,
			fill: "transparent",
			evented: false,
			selectable: false,
		});

		objects.push(tableContent);
	}

	drawTableHeaders(objects) {
		// Clock number place
		let clockHolder = new fabric.Rect({
			top: 0,
			left: 120,
			stroke: "#555",
			strokeWidth: 2,
			width: this.width,
			height: 30,
			fill: "transparent",
			evented: false,
			selectable: false,
		});

		// Instructions name holder
		let instructionHolder = new fabric.Rect({
			top: 30,
			left: 0,
			stroke: "#555",
			strokeWidth: 2,
			width: 120,
			height: this.height,
			fill: "transparent",
			evented: false,
			selectable: false,
		});

		objects.push(instructionHolder);
		objects.push(clockHolder);
	}

	drawClocks(numberClocks, objects) {
		let width = 45;
		for (let i = 1; i < numberClocks; i++) {
			console.log(i);
			let line = new fabric.Line([0, 0, 0, this.height + 30], {
				top: 0,
				left: 120 + width * i,
				stroke: "#888"
			});

			objects.push(line);
		}

		for (let i = 1; i < numberClocks; i++) {
			let padded = i < 10 ? "0" + i : "" + i;
			let text = new fabric.Textbox(padded, {
				fontSize: 12,
				top: 10,
				left: 157 + 45 * (i-1),
				height: 30,
				width: 45,
				originX: "center",
			});

			objects.push(text);
		}
	}

	drawInstructions(numberInstructions, arr) {
		let height = this.height / numberInstructions;
		for (let i = 1; i < numberInstructions; i++) {
			let line = new fabric.Line([0, 0, this.width + 120, 0], {
				top: 30 + height * i,
				left: 0, 
				stroke: "#888"	
			});

			arr.push(line);
		}
	}

}

module.exports = PipelineTableComponent;