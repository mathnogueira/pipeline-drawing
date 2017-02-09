import { EInstructionType, Instruction } from './instruction';

export class RegisterInstruction extends Instruction {

	constructor(statement: string) {
		super(statement);
		this.type = EInstructionType.REGISTER;
		if (["addd", "subd"].indexOf(this.name) >= 0) this.exUnit = "fp_add";
		else if ("multd" == this.name) this.exUnit = "fp_mult";
		else if ("divd" == this.name) this.exUnit = "fp_div";
		else if (["add", "daddui", "subi"].indexOf(this.name) >= 0) this.exUnit = "int_add";
		else if ("mult" == this.name) this.exUnit = "int_mult";
		else this.exUnit = "int_div";
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