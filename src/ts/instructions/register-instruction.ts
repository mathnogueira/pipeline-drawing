import { EInstructionType, Instruction } from './instruction';

export class RegisterInstruction extends Instruction {

	constructor(statement: string) {
		super(statement);
		this.type = EInstructionType.REGISTER;
	}

	protected retrieveRegisters(args: Array<string>) :void {
		this.detinationRegister = args[1];
		this.operants = this.getOperants(args);
	}

	private getOperants(args: Array<string>) :Array<string> {
		let operants = new Array<string>();
		operants = args.slice(2);

		return operants;
	}

}