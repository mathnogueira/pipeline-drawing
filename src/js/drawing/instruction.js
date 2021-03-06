"use strict";

import Stage from "./components/stage.js";
import Stall from "./components/stall.js";

class Instruction {

	constructor(options) {
		this.text = options.instruction;
		this.execution = options.numberExecutions;
		this.stalls = options.stalls || [];
		this.unit = options.unit;
		this.exLabel = options.executionLabel || "X";
	}

	createStages() {
		let stages = this._createStages();
		stages = this._addStalls(stages);
		return stages;
	}

	createInstructionName(number) {
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

	_addStalls(stages) {
		let _stages = [];
		let stage = 0;
		let numberStages = stages.length + this.stalls.length;
		_stages.length = numberStages;
		for (let i = 0; i < this.stalls.length; i++) {
			_stages[this.stalls[i]] = new Stall("S");
		}
		for (let i = 0; i < numberStages; i++) {
			if (_stages[i] === undefined) {
				_stages[i] = stages[stage++];
			}
		}
		return _stages;
	}
}

module.exports = Instruction;