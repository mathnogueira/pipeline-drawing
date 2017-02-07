export enum EInstructionType {
	REGISTER = 1,
	MEMORY = 2,
	BRANCH = 3
}

export abstract class Instruction {

	public name: string;
	public detinationRegister: string;
	public operants: Array<string>;
	public type: EInstructionType;

	constructor(statement: string) {
		let splited: Array<string> = statement.split(" ");
		this.name = splited[0];
		this.retrieveRegisters(splited);
	}

	protected abstract retrieveRegisters(args: Array<string>) :void;

}