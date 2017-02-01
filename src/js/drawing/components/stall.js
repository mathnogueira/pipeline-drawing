"use strict";

import Stage from "./stage.js";

class Stall extends Stage {

	constructor(instruction, cycle) {
		super("S", instruction, cycle);
		this.color = "#ff0000";
	}
}

module.exports = Stall;