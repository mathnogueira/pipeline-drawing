declare var fabric: any;

import { Stage } from "./components/stage";
import { Stall } from "./components/stall";

export class Instruction {

	public text;
	public execution;
	public stalls;
	public unit;
	public exLabel;
	public structure;

	constructor(options?: any) {
		this.text = options.instruction;
		this.execution = options.execution;
		this.unit = options.unit;
		this.exLabel = options.executionLabel || "X";
	}
	public getInstructionName(number) {
		return new fabric.Textbox(this.text, {
			fontSize: 12,
			top: 45 + 40 * number,
			left: 10,
			height: 40,
			width: 120,
		});
	}

	_createStages() {
		let stages = [];
		stages.push(new Stage("I", 0, 0));
		stages.push(new Stage("D", 0, 0));
		for (let i = 0; i < this.execution; i++) {
			stages.push(new Stage(this.exLabel, 0, 0));
		}
		stages.push(new Stage("M", 0, 0));
		stages.push(new Stage("W", 0, 0));
		return stages;
	}
}