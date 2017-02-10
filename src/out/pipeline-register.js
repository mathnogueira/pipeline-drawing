/**
 * Classe que encapsula os registradores da pipeline.
 *
 * @author Matheus Nogueira
 * @version 1.0
 */
var PipelineRegisters = (function () {
    function PipelineRegisters() {
        this.INSTRUCTIONS = new Array();
        this.IF_ID = new Object();
        this.ID_EX = new Object();
        this.EX_MEM = new Object();
        this.MEM_WB = new Object();
    }
    PipelineRegisters.prototype.copy = function (registers) {
        this.IF_ID = registers.IF_ID;
        this.ID_EX = registers.ID_EX;
        this.EX_MEM = registers.EX_MEM;
        this.MEM_WB = registers.MEM_WB;
    };
    return PipelineRegisters;
}());
export { PipelineRegisters };
