(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Classe que controla a zona de desenho da pipeline usando a biblioteca
 * FabricJS como renderizadora.
 * 
 * @author Matheus Nogueira
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {

	/**
  * Constroi um novo canvas para renderizar a pipeline.
  * 
  * @param {string} canvas id do canvas
  * @param {number} width largura do canvas
  * @param {number} height altura do canvas
  */
	function Canvas(canvas, width, height) {
		_classCallCheck(this, Canvas);

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


	_createClass(Canvas, [{
		key: "initialize",
		value: function initialize() {
			var configuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			this.$$canvas.setWidth(this.width);
			this.$$canvas.setHeight(this.height);
		}
	}, {
		key: "add",
		value: function add(component) {
			this.$$canvas.add(component.build());
		}
	}, {
		key: "render",
		value: function render() {
			this.$$canvas.renderAll();
		}
	}, {
		key: "toImage",
		value: function toImage() {
			window.open(this.$$canvas.toDataURL("png"));
		}
	}]);

	return Canvas;
}();

module.exports = Canvas;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
	function Component() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
		var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

		_classCallCheck(this, Component);

		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}

	_createClass(Component, [{
		key: "build",
		value: function build() {
			return new fabric.Rect({
				top: 10,
				left: 50,
				fill: "red",
				height: 50,
				width: 50
			});
		}
	}]);

	return Component;
}();

module.exports = Component;

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("./component.js");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PipelineTableComponent = function (_Component) {
	_inherits(PipelineTableComponent, _Component);

	function PipelineTableComponent() {
		_classCallCheck(this, PipelineTableComponent);

		var _this = _possibleConstructorReturn(this, (PipelineTableComponent.__proto__ || Object.getPrototypeOf(PipelineTableComponent)).call(this, 10, 10, 900, 400));

		_this.$$cicles = 20;
		return _this;
	}

	_createClass(PipelineTableComponent, [{
		key: "setCycles",
		value: function setCycles(numberCycles) {
			this.$$cicles = numberCycles;
		}
	}, {
		key: "build",
		value: function build() {
			var objects = [];
			// Desenha as linhas separadores do clock
			this.drawClocks(this.$$cicles, objects);
			this.drawInstructions(10, objects);
			this.drawTableHeaders(objects);
			this.drawTableContent(objects);

			return new fabric.Group(objects, {
				top: this.y,
				left: this.x
			});
			// return clockLines;
		}
	}, {
		key: "drawTableContent",
		value: function drawTableContent(objects) {
			var tableContent = new fabric.Rect({
				top: 30,
				left: 120,
				stroke: "#555",
				strokeWidth: 2,
				width: this.width,
				height: this.height,
				fill: "transparent",
				evented: false,
				selectable: false
			});

			objects.push(tableContent);
		}
	}, {
		key: "drawTableHeaders",
		value: function drawTableHeaders(objects) {
			// Clock number place
			var clockHolder = new fabric.Rect({
				top: 0,
				left: 120,
				stroke: "#555",
				strokeWidth: 2,
				width: this.width,
				height: 30,
				fill: "transparent",
				evented: false,
				selectable: false
			});

			// Instructions name holder
			var instructionHolder = new fabric.Rect({
				top: 30,
				left: 0,
				stroke: "#555",
				strokeWidth: 2,
				width: 120,
				height: this.height,
				fill: "transparent",
				evented: false,
				selectable: false
			});

			objects.push(instructionHolder);
			objects.push(clockHolder);
		}
	}, {
		key: "drawClocks",
		value: function drawClocks(numberClocks, lineArr) {
			var width = 45;
			for (var i = 1; i < numberClocks; i++) {
				var line = new fabric.Line([0, 0, 0, this.height + 30], {
					top: 0,
					left: 120 + width * i,
					stroke: "#888"
				});

				lineArr.push(line);
			}
		}
	}, {
		key: "drawInstructions",
		value: function drawInstructions(numberInstructions, arr) {
			var height = this.height / numberInstructions;
			for (var i = 1; i < numberInstructions; i++) {
				var line = new fabric.Line([0, 0, this.width + 120, 0], {
					top: 30 + height * i,
					left: 0,
					stroke: "#888"
				});

				arr.push(line);
			}
		}
	}]);

	return PipelineTableComponent;
}(_component2.default);

module.exports = PipelineTableComponent;

},{"./component.js":2}],4:[function(require,module,exports){
"use strict";

var _canvas = require("./drawing/canvas");

var _canvas2 = _interopRequireDefault(_canvas);

var _pipelineTable = require("./drawing/components/pipeline-table.js");

var _pipelineTable2 = _interopRequireDefault(_pipelineTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {

	// Inicializa o projeto quando a página estiver carregada.
	window.onload = init;
	window.exportImage = exportImage;

	var canvas = void 0;

	function init() {
		canvas = new _canvas2.default("pipeline", 3000, 450);
		canvas.initialize();
		canvas.add(new _pipelineTable2.default());
		canvas.render();
	}

	function exportImage() {
		canvas.toImage();
	}
})();

},{"./drawing/canvas":1,"./drawing/components/pipeline-table.js":3}]},{},[4])