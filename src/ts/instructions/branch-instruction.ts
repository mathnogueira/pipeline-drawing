import { EInstructionType, Instruction } from './instruction';

export class BranchInstruction extends Instruction {

	constructor(statement: string) {
		super(statement);
		this.type = EInstructionType.BRANCH;
	}

	protected retrieveRegisters(args: Array<string>) :void {
		this.detinationRegister = null;
		this.operants = this.getOperants(args);
	}

	private getOperants(args: Array<string>) :Array<string> {
		let operants = new Array<string>();
		if (this.name == "beq") {
			operants = args.slice(1, 3);
		} else {
			operants = args.slice(1, 2);
		}

		return operants;
	}
}