/**
 * Classe que controla a zona de desenho da pipeline usando a biblioteca
 * FabricJS como renderizadora.
 *
 * @author Matheus Nogueira
 */
var Canvas = (function () {
    /**
     * Constroi um novo canvas para renderizar a pipeline.
     *
     * @param {string} canvas id do canvas
     * @param {number} width largura do canvas
     * @param {number} height altura do canvas
     */
    function Canvas(canvas, width, height) {
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
    Canvas.prototype.initialize = function (configuration) {
        if (configuration === void 0) { configuration = {}; }
        this.$$canvas.setWidth(this.width);
        this.$$canvas.setHeight(this.height);
    };
    Canvas.prototype.add = function (component) {
        this.$$canvas.add(component.build());
    };
    Canvas.prototype.render = function () {
        this.$$canvas.renderAll();
    };
    Canvas.prototype.toImage = function () {
        window.open(this.$$canvas.toDataURL("png"));
    };
    return Canvas;
}());
export { Canvas };
