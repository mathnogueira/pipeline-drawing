import { RegisterController } from '../register-controller';
import { Instruction } from '../instructions/instruction';
import { IFunctionalUnit } from '../IUnit';

export abstract class FunctionalUnit implements IFunctionalUnit {

	// Registradores de entrada e saída de dados da unidade funcional.
	protected input: Object;
	protected output: Object;

	/**
	 * Cria uma nova unidade funcional e define seus registradores de entrada e saída de dados.
	 * 
	 * @param {Object} input registrador de entrada de dados da unidade funcional.
	 * @param {Object} output registrador de saída de dados da unidade funcional.
	 */
	constructor(input: Object, output: Object) {
		this.input = input;
		this.output = output;
	}

	public abstract execute(regController?: RegisterController): void;

	public abstract tick(cycle?: number) :void;
}