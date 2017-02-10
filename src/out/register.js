/**
 * Enum que indica o estado de um registrador do processador.
 *
 * @author Matheus Nogueira
 * @version 1.0
 */
/**
 * Enum que indica o estado de um registrador do processador.
 *
 * @author Matheus Nogueira
 * @version 1.0
 */ export var ERegisterState;
(function (ERegisterState) {
    ERegisterState[ERegisterState["NOT_BUSY"] = 0] = "NOT_BUSY";
    ERegisterState[ERegisterState["BUSY"] = 1] = "BUSY";
})(ERegisterState || (ERegisterState = {}));
/**
 * Entidade que representa um registrador do processador. Cada instância dessa entidade deve
 * ter um nome (nome do registrador), e este também terá um status, o qual é usado para
 * controle interno de uso de registradores da pipeline.
 *
 * @author Matheus Nogueira
 * @version 1.0
 */
var Register = (function () {
    /**
     * Cria um novo registrador no estado inicial (NOT BUSY)
     *
     * @param {string} registerName nome do registrador.
     */
    function Register(registerName) {
        this.name = registerName;
        this.state = ERegisterState.NOT_BUSY;
    }
    /**
     * Checa se o registrador pode ser lido.
     *
     * @return true se o registrador não estiver ocupado para leitura.
     */
    Register.prototype.isReadable = function () {
        return this.state === ERegisterState.NOT_BUSY;
    };
    /**
     * Chegca se o registrador pode ser escrito.
     *
     * @return true se o registrador não estiver ocupado para escrita.
     */
    Register.prototype.isWritable = function () {
        return this.state === ERegisterState.NOT_BUSY;
    };
    /**
     * Define um novo estado para o registrador.
     *
     * @param {ERegisterState} state novo estado do registrador.
     */
    Register.prototype.setState = function (state) {
        this.state = state;
    };
    return Register;
}());
export { Register };
