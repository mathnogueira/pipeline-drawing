import { StallException } from '../src/ts/stall';
import { suite, test } from "mocha-typescript";
import { StructureHazardDetector } from "../src/ts/structure-hazard-detector";

@suite("StructureHazardDetector")
class StructureHazardDetectorTest {

	@test("Should not cause a stall when an unit is free")
	unitIsFree() {
		let detector = new StructureHazardDetector();
		detector.useStructure("id");
	}

	@test("Should cause stall if unit is under use")
	unitIsBusy() {
		let detector = new StructureHazardDetector();
		detector.useStructure("id");
		try {
			for (let i: number = 0; i < detector.defaultStructure["id"]; i++) {
				detector.useStructure("id");
			}
			throw new Error("Id unit should not be used while it is busy");
		} catch (error) {
			if (!(error instanceof StallException))
				throw error;
		}
	}

	@test("Should not let the unit be available for 2 cycles")
	unitIsBusyFor2Cycles() {
		let detector = new StructureHazardDetector();
		let numberStalls: number = 0;
		for (let i: number = 0; i < detector.defaultStructure["id"]; i++) {
			detector.useStructure("id", 2);
		}
		for (let tick: number = 0; tick < 2; tick++) {
			try {
				detector.useStructure("id");
			} catch (error) {
				numberStalls++;
			}
			detector.tick();
		}
		// Checa se houveram 2 bolhas
		if (numberStalls !== 2) {
			throw new Error("Should be 2 stalls in the instruction");
		}
		// Tenta usar a estrutura depois de 2 ciclos
		detector.useStructure("id");
	}
}