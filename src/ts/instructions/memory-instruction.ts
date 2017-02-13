import { EInstructionType, Instruction } from './instruction';

export class MemoryInstruction extends Instruction {

	constructor(statement: string) {
		super(statement);
		this.type = EInstructionType.MEMORY;
		this.exUnit = "int_add";
	}

	protected retrieveRegisters(args: Array<string>) :void {
		this.detinationRegister = null;
		this.operants = this.getOperants(args);
	}

	private getOperants(args: Array<string>) :Array<string> {
		let operants = new Array<string>();
		let rs = args[2].slice(args[2].indexOf("(") + 1).replace(")", "");
		operants.push(rs);
		if (["ld", "lw"].indexOf(this.name) >= 0)
			this.detinationRegister = args[1];
		else 
			operants.push(args[1]);
		return operants;
	}

}