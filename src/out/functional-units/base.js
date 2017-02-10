var FunctionalUnit = (function () {
    /**
     * Cria uma nova unidade funcional e define seus registradores de entrada e saída de dados.
     *
     * @param {Object} input registrador de entrada de dados da unidade funcional.
     * @param {Object} output registrador de saída de dados da unidade funcional.
     */
    function FunctionalUnit(input, output) {
        this.input = input;
        this.output = output;
    }
    return FunctionalUnit;
}());
export { FunctionalUnit };
