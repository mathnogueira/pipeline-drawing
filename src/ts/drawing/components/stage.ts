declare var fabric: any;

import { Component } from "./component";


export class Stage extends Component {

	public instruction;
	public cycle;
	public text;
	public color;
	public width;
	public height;

	constructor(text, instruction, cycle) {
		super(0, 0, 45, 40);
		this.instruction = instruction;
		this.cycle = cycle;
		this.text = text;
		this.color = "#aaddaa";
	}

	build() {
		let box =  new fabric.Rect({
			top: 30 + (this.instruction * this.height),
			left: 120 + (this.cycle * this.width),
			stroke: "#555",
			strokeWidth: 2,
			width: this.width,
			height: this.height,
			fill: this.color,
			evented: false,
			selectable: false,
		});

		let text = new fabric.Textbox(this.text, {
			fontSize: 25,
			top: 37 + (this.height * this.instruction),
			left: 144 + (this.width * this.cycle),
			originX: "center"
		});

		return [box, text];
	}

}