/**
 * Entidade que representa uma bolha no pipeline.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export class StallException {

	public message: string;

	constructor(msg?: string) {
		this.message = msg;
	}
}