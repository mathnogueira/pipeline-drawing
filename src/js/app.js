"use strict";

import Canvas from "./drawing/canvas";
import PipelineTableComponent from "./drawing/components/pipeline-table.js";

(function() {

	// Inicializa o projeto quando a página estiver carregada.
	window.onload = init;
	window.exportImage = exportImage;

	let canvas;

	function init() {
		canvas = new Canvas("pipeline", 3000, 450);
		canvas.initialize();
		canvas.add(new PipelineTableComponent());
		canvas.render();
	}

	function exportImage() {
		canvas.toImage();
	}
})();