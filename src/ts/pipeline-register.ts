import { Instruction } from './instructions/instruction';
/**
 * Classe que encapsula os registradores da pipeline.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export class PipelineRegisters {

	public INSTRUCTIONS: Array<Instruction>;
	public IF_ID: Object;
	public ID_EX: Object;
	public EX_MEM: Object;
	public MEM_WB: Object;

	constructor() {
		this.INSTRUCTIONS = new Array<Instruction>();
		this.IF_ID = new Object();
		this.ID_EX = new Object();
		this.EX_MEM = new Object();
		this.MEM_WB = new Object();
	}

	copy(registers: PipelineRegisters) {
		this.IF_ID = registers.IF_ID;
		this.ID_EX = registers.ID_EX;
		this.EX_MEM = registers.EX_MEM;
		this.MEM_WB = registers.MEM_WB;
	}

}