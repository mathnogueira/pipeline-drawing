/**
 * Enum que indica o estado de um registrador do processador.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export enum ERegisterState {
	NOT_BUSY 	= 0,
	BUSY		= 1
}

/**
 * Entidade que representa um registrador do processador. Cada instância dessa entidade deve
 * ter um nome (nome do registrador), e este também terá um status, o qual é usado para 
 * controle interno de uso de registradores da pipeline.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export class Register {

	private name: string;
	private state: ERegisterState;

	/**
	 * Cria um novo registrador no estado inicial (NOT BUSY)
	 * 
	 * @param {string} registerName nome do registrador.
	 */
	constructor(registerName: string) {
		this.name = registerName;
		this.state = ERegisterState.NOT_BUSY;
	}

	/**
	 * Checa se o registrador pode ser lido.
	 * 
	 * @return true se o registrador não estiver ocupado para leitura.
	 */
	isReadable() {
		return this.state === ERegisterState.NOT_BUSY;
	}

	/**
	 * Chegca se o registrador pode ser escrito.
	 * 
	 * @return true se o registrador não estiver ocupado para escrita.
	 */
	isWritable() {
		return this.state === ERegisterState.NOT_BUSY;
	}

	/**
	 * Define um novo estado para o registrador.
	 * 
	 * @param {ERegisterState} state novo estado do registrador.
	 */
	setState(state: ERegisterState) {
		this.state = state;
	}
	
}