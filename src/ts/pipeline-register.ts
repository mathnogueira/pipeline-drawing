/**
 * Classe que encapsula os registradores da pipeline.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export class PipelineRegisters {

	public IF_ID: Object;
	public ID_EX: Object;
	public EX_MEM: Object;
	public MEM_WB: Object;

	constructor() {
		this.IF_ID = new Object();
		this.ID_EX = new Object();
		this.EX_MEM = new Object();
		this.MEM_WB = new Object();
	}

}