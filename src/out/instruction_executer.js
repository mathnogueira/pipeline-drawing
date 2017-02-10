import { StallException } from './stall';
import { EStage } from './instructions/instruction';
var InstructionExecuter = (function () {
    function InstructionExecuter(regController, hazardDetector, pipelineRegisters) {
        this.cyclesLeft = -1;
        this.rdReserved = null;
        this.regController = regController;
        this.structureController = hazardDetector;
        this.pipelineRegisters = pipelineRegisters;
        this.free = true;
    }
    InstructionExecuter.prototype.setInstruction = function (instruction) {
        this.currentInstruction = instruction;
        this.free = false;
    };
    InstructionExecuter.prototype.tick = function (cycle) {
        var stage = this.currentInstruction.stage;
        switch (stage) {
            case EStage.IF:
                this.currentInstruction.output["if"] = cycle;
                this.unit = this.structureController.useStructure("if", 1);
                this.currentInstruction.stage = EStage.ID;
                break;
            case EStage.ID:
                this.currentInstruction.output["id"] = cycle;
                this.unit = this.structureController.useStructure("id", 1);
                this.currentInstruction.stage = EStage.EX;
                break;
            case EStage.EX:
                if (this.cyclesLeft === -1) {
                    this.currentInstruction.output["ex"] = cycle;
                    this.unit = this.structureController.useStructure(this.currentInstruction.exUnit, this.currentInstruction.delay);
                    this.cyclesLeft = this.currentInstruction.delay;
                }
                try {
                    // tenta ler os operandos
                    this.executeInstruction();
                }
                catch (e) {
                    // Nao executou nenhum ciclo ainda
                    if (this.cyclesLeft == this.currentInstruction.delay)
                        this.currentInstruction.output["ex"] = cycle + 1;
                    throw e;
                }
                this.cyclesLeft--;
                console.log("No ciclo", cycle, "faltam", this.cyclesLeft, "para terminar a instrucao", this.currentInstruction.name);
                if (this.cyclesLeft === 0) {
                    this.currentInstruction.stage = EStage.MEM;
                }
                break;
            case EStage.MEM:
                this.currentInstruction.output["mem"] = cycle;
                this.unit = this.structureController.useStructure("mem", 1);
                this.currentInstruction.stage = EStage.WB;
                break;
            case EStage.WB:
                this.currentInstruction.output["wb"] = cycle;
                this.unit = this.structureController.useStructure("wb", 1);
                this.currentInstruction.stage = EStage.FINISHED;
                this.free = true;
                break;
        }
        this.currentInstruction.tick();
        if (this.unit) {
            this.unit.execute();
            this.unit.tick();
        }
    };
    InstructionExecuter.prototype.executeInstruction = function () {
        // tenta ler os operandos fonte
        for (var i = 0; i < this.currentInstruction.operants.length; i++) {
            var operant = this.currentInstruction.operants[i];
            // Se o registrador estiver sob uso.
            if (!this.regController.isReadable(operant)) {
                // A instrucao atual nao esta usando o registrador como RD
                var currentExecuter = this.regController.getExecutingInstruction(operant);
                if (currentExecuter != this.currentInstruction &&
                    currentExecuter.dispatchedCycle < this.currentInstruction.dispatchedCycle) {
                    // if(operant != this.rdReserved) {
                    // Tem que soltar uma bolha ou tentar o adiantamento.
                    // ADIANTAMENTO:
                    // USAR O this.pipelineRegisters para verificar quais registradores
                    // estao em qual etapa da execucao. Aplicar o algoritmo do slide.
                    // bolha
                    throw new StallException("conflito de dados no " + operant);
                }
            }
        }
        if (!this.rdReserved) {
            // Reserva o rd por delay + 1 ciclos (ex + mem)
            this.regController.write(this.currentInstruction.detinationRegister, this.currentInstruction.delay + 1, this.currentInstruction);
            this.rdReserved = this.currentInstruction.detinationRegister;
        }
    };
    InstructionExecuter.prototype.haveFinished = function () {
        return this.free;
    };
    return InstructionExecuter;
}());
export { InstructionExecuter };
