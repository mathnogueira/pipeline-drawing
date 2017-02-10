var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { FunctionalUnit } from './base';
var EXunit = (function (_super) {
    __extends(EXunit, _super);
    function EXunit(registers) {
        var _this = _super.call(this, registers.ID_EX, registers.EX_MEM) || this;
        _this.cyclesLeft = undefined;
        _this.rd = undefined;
        return _this;
    }
    EXunit.prototype.execute = function (regController) {
        // let isReadable: boolean;
        // let canExecute: boolean = true;
        if (!this.cyclesLeft)
            this.cyclesLeft = this.input["cost"];
        if (!this.rd)
            this.rd = this.input["rd"];
        // // Reserva os registradores rs e rt para leitura
        // if (this.input["rs"]) {
        //     isReadable = regController.isReadable("rs");
        //     if (!isReadable) {
        //         // Tenta adiantar rs
        //         canExecute = false;
        //     }
        // }
        // if (this.input["rt"]) {
        //     isReadable = regController.isReadable("rt");
        //     if (!isReadable) {
        //         // tenta adiantar rt
        //         canExecute = false;
        //     }
        // }
        // // Reserva o Rd para escrita
        // if (this.input["rd"]) {
        //     regController.write(this.input["rd"], 5);
        // }
        // if (!canExecute) {
        //     // Se tudo for em vão, para a pipeline.
        //     throw new StallException();
        // }
    };
    EXunit.prototype.tick = function (cycle) {
        if (this.cyclesLeft === undefined)
            return;
        this.cyclesLeft -= 1;
        if (this.cyclesLeft === 0) {
            this.output["rd"] = this.rd;
        }
    };
    return EXunit;
}(FunctionalUnit));
export { EXunit };
