import { IUnit } from '../IUnit';
export enum EInstructionType {
	REGISTER = 1,
	MEMORY = 2,
	BRANCH = 3
}

export enum EStage {
	IF = 1,
	ID = 2,
	EX = 3,
	MEM = 4,
	WB = 5,
	FINISHED = 6
}

export abstract class Instruction implements IUnit {

	public name: string;
	public detinationRegister: string;
	public operants: Array<string>;
	public type: EInstructionType;
	public exUnit: string;
	public delay: number;
	public stage: EStage;

	constructor(statement: string) {
		let splited: Array<string> = statement.split(" ");
		this.name = splited[0];
		this.retrieveRegisters(splited);
		this.stage = EStage.IF;
		this.delay = InstructionDelay[this.name];
	}

	protected abstract retrieveRegisters(args: Array<string>) :void;

	public tick() :void {
		
	}

}

export class InstructionDelay {

	public static addd: number = 1;
	public static subd: number = 1;
	public static multd: number = 1;
	public static divd: number = 1;
	public static ld: number = 1;
	public static sd: number = 1;
	public static add: number = 1;
	public static daddui: number = 1;
	public static subi: number = 1;
	public static mult: number = 7;
	public static div: number = 20;
	public static lw: number = 1;
	public static sw: number = 1;
	public static beq: number = 1;
	public static bnez: number = 1;



}