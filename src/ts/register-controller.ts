import { Instruction } from './instructions/instruction';
import { IUnit } from './IUnit';
import { Register, ERegisterState } from "./register"

/**
 * Entidade que gerencia o estado de cada registrador do programa. Essa entidade é responsável por
 * dizer se um determinado registrador pode ou não ser lido ou escrito.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export class RegisterController implements IUnit {

	private registers :Array<Register>;
	private cycles: number[];
	private instructions: Object;

	constructor() {
		this.registers = new Array<Register>();
		this.cycles = new Array<number>();
		this.instructions = new Object();
	}

	/**
	 * Verifica se determinado registrador está disponível para leitura.
	 * 
	 * @param registerName nome do registrador.
	 * @return true se o registrador estiver disponível, false caso contrário.
	 */
	isReadable(registerName :string) :boolean {
		let register = this.getRegister(registerName);
		return register.isReadable();
	}
	
	/**
	 * Realiza a operação de escrita no registrador por um tempo determinado.
	 * 
	 * @param {string} registerName nome do registrador.
	 * @param {Number} busyCycles número de ciclos em que o registrador estará ocupado.
	 * @param {Instruction} instruction quem reservou o registrador
	 */
	write(registerName: string, busyCycles: Number, instruction?: Instruction) :void {
		let register = this.getRegister(registerName);
		register.setState(ERegisterState.BUSY);
		this.cycles[registerName] = busyCycles;
		this.instructions[registerName] = instruction;
	}

	getExecutingInstruction(registerName): Instruction {
		return this.instructions[registerName];
	}

	/**
	 * Executa um ciclo de clock no controlador de registradores. Isso irá atualizar os controladores que estão em uso
	 * para que o estado de cada registrador seja alterado no momento certo (busyCycles == 0).
	 */
	tick() :void {
		for (let register in this.cycles) {
			let cyclesLeft: number = this.cycles[register];
			cyclesLeft -= 1;
			if (cyclesLeft >= 0) {
				this.cycles[register] = cyclesLeft;
			}
			if (cyclesLeft === 0) {
				let reg = this.getRegister(register);
				reg.setState(ERegisterState.NOT_BUSY);
			}
		}
	}

	/**
	 * Obtem um registrador pelo seu nome.
	 * 
	 * @param {string} registerName nome do regsitrador
	 * @return registrador com o nome especificado.
	 */
	private getRegister(registerName) : Register {
		if (this.registers[registerName] === undefined) {
			this.registers[registerName] = new Register(registerName);
		}
		return this.registers[registerName];
	}

}