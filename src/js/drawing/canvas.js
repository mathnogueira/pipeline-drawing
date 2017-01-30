"use strict";

/**
 * Classe que controla a zona de desenho da pipeline usando a biblioteca
 * FabricJS como renderizadora.
 * 
 * @author Matheus Nogueira
 */
class Canvas {

	/**
	 * Constroi um novo canvas para renderizar a pipeline.
	 * 
	 * @param {string} canvas id do canvas
	 * @param {number} width largura do canvas
	 * @param {number} height altura do canvas
	 */
	constructor(canvas, width, height) {
		// this.$$canvas = document.getElementById(canvas);
		this.$$canvas = new fabric.Canvas(canvas);
		this.width = width;
		this.height = height;
	}

	/**
	 * Inicializa o canvas com as configurações passadas via construtor.
	 * 
	 * @param {object} configuration configuração de aparencia do canvas
	 */
	initialize(configuration = {}) {
		this.$$canvas.setWidth(this.width);
		this.$$canvas.setHeight(this.height);
	}

	add(component) {
		this.$$canvas.add(component.build());
	}

	render() {
		this.$$canvas.renderAll();	
	}

	toImage() {
		window.open(this.$$canvas.toDataURL("png"));
	}
}

module.exports = Canvas;