import { Instruction } from './instructions/instruction';

/**
 * Interface que representa qualquer unidade que trabalha com ciclos de clock.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export interface IUnit {
	tick(cycle?: number) :void;
}

/**
 * Interface que representa qualquer unidade funcional que pode executar uma instrução da pipeline.
 * 
 * @author Matheus Nogueira
 * @version 1.0
 */
export interface IFunctionalUnit extends IUnit {
	execute(instruction? :Instruction) :void;
}