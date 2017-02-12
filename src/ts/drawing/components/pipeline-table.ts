import { Stall } from './stall';
import { Stage } from './stage';
import { Instruction } from '../../instructions/instruction';
declare var fabric: any;

import { Component } from "./component";

export class PipelineTableComponent extends Component {

	public $$cycles;
	public objects;
	public currentInstruction;
	public currentCycle;
	public instructions;
	public width;
	public height;
	public x;
	public y;
	private cycles: number;
	private numberInstructions: number;

	constructor(cycles, instructions) {
		let height = instructions * 40;
		let width = cycles * 45;
		super(10, 10, width, height);
		this.numberInstructions = instructions;
		this.cycles = cycles;
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
		this.objects.push(instruction.getInstructionName(this.currentInstruction));
	}

	addInstruction(instruction) {
			let labels = {
				if: "if",
				id: "id",
				ex: "X",
				mem: "m",
				wb: "wb"
			};

			let order = ["if", "id", "ex", "mem", "wb"];
		for (let key in instruction.execution) {
			if (key != "stalls") {
				let firstCycle: number = instruction.execution[key];
				let nextStage = order[order.indexOf(key)+1];
				let lastCycle: number = instruction.execution[nextStage] || firstCycle;
				let currentCycle: number = firstCycle-1;
				while (currentCycle < lastCycle) {
					let stage: Stage;
					if (instruction.execution["stalls"].indexOf(currentCycle+1) < 0) {
						stage = new Stage(labels[key], this.currentInstruction, currentCycle);
					} else {
						stage = new Stall(this.currentInstruction, currentCycle);
					}
					this.addStage(stage);
					currentCycle++;
				}
			}
		}

		this.addInstructionName(instruction);
		this.currentInstruction++;
		this.currentCycle++;

		let totalAux = this.currentCycle + instruction.execution["wb"];
		if (totalAux > this.$$cycles) {
			this.$$cycles = totalAux;
		}
	}

	build() {
		let objects = this.objects;
		// Desenha as linhas separadores do clock
		this.drawClocks(this.cycles + 1, objects);
		this.drawInstructions(this.numberInstructions, objects);
		this.drawTableHeaders(objects);
		this.drawTableContent(objects);

		return new fabric.Group(objects, {
			top: this.y,
			left: this.x,
		});
	}

	private drawTableContent(objects) {
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

	private drawTableHeaders(objects) {
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

	private drawClocks(numberClocks, objects) {
		let width = 45;
		for (let i = 1; i < numberClocks; i++) {
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

	private drawInstructions(numberInstructions, arr) {
		// let height = this.height / numberInstructions;
		let height = 40;
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