"use strict";

import Canvas from "./drawing/canvas";
import PipelineTableComponent from "./drawing/components/pipeline-table.js";
import Stage from "./drawing/components/stage.js";

(function() {

	// Inicializa o projeto quando a página estiver carregada.
	window.onload = init;
	window.exportImage = exportImage;

	let canvas;

	function init() {
		let pipeline = new PipelineTableComponent();
		canvas = new Canvas("pipeline", 3000, 450);
		canvas.initialize();
		pipeline.addStage(new Stage("I", 0, 0));
		pipeline.addStage(new Stage("D", 0, 1));
		for (let i = 0; i < 7; i++) {
			pipeline.addStage(new Stage("m", 0, 2 + i));
		}
		pipeline.addStage(new Stage("M", 0, 9));
		pipeline.addStage(new Stage("W", 0, 10));

		pipeline.addStage(new Stage("I", 1, 1));
		pipeline.addStage(new Stage("D", 1, 2));
		for (let i = 0; i < 7; i++) {
			pipeline.addStage(new Stage("m", 1, 3 + i));
		}
		pipeline.addStage(new Stage("M", 1, 10));
		pipeline.addStage(new Stage("W", 1, 11));
		canvas.add(pipeline);
		canvas.render();
	}

	function exportImage() {
		canvas.toImage();
	}
})();