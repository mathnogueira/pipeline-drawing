/**
 * Entidade que representa uma bolha no pipeline.
 *
 * @author Matheus Nogueira
 * @version 1.0
 */
var StallException = (function () {
    function StallException(msg) {
        this.message = msg;
    }
    return StallException;
}());
export { StallException };
