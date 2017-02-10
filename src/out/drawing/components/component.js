var Component = (function () {
    function Component(x, y, w, h) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    Component.prototype.build = function () {
        return new fabric.Rect({
            top: 10,
            left: 50,
            fill: "red",
            height: 50,
            width: 50
        });
    };
    return Component;
}());
export { Component };
