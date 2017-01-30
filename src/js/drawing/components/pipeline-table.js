"use strict";

import Component from "./component.js";

class PipelineTableComponent extends Component {

	constructor() {
		super(10, 10, 900, 400);
		this.$$cicles = 20;
	}

	setCycles(numberCycles) {
		this.$$cicles = numberCycles;
	}

	build() {
		let objects = [];
		// Desenha as linhas separadores do clock
		this.drawClocks(this.$$cicles, objects);
		this.drawInstructions(10, objects);
		this.drawTableHeaders(objects);
		this.drawTableContent(objects);

		return new fabric.Group(objects, {
			top: this.y,
			left: this.x,
		});
		// return clockLines;
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

	drawClocks(numberClocks, lineArr) {
		let width = 45;
		for (let i = 1; i < numberClocks; i++) {	
			let line = new fabric.Line([0, 0, 0, this.height + 30], {
				top: 0,
				left: 120 + width * i,
				stroke: "#888"
			});

			lineArr.push(line);
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