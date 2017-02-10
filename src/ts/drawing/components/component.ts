declare var fabric: any;

export class Component {

	public x;
	public y;
	public width;
	public height;

	constructor(x = 0, y = 0, w = 0, h = 0) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}

	build() {
		return new fabric.Rect({
			top: 10,
			left: 50,
			fill: "red",
			height: 50,
			width: 50,
		});
	}
}