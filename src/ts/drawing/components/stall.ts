declare var fabric: any;

import {Stage} from "./stage";

export class Stall extends Stage {

	constructor(instruction, cycle?) {
		super("S", instruction, cycle);
		this.color = "#ff0000";
	}
}
