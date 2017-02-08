import { suite, test } from "mocha-typescript";
import { RegisterController } from "../src/ts/register-controller";

@suite("RegisterController")
class RegisterControllerSuite {

	private controller: RegisterController;

	constructor() {
		this.controller = new RegisterController();
	}
	
	@test("Should let F0 be used because it is not busy")
	registerNotInUse() {
		if (!this.controller.isReadable("F0")) {
			throw new Error("F0 should be readable");
		}
	}

	@test("Should not let F0 be used because it is busy")
	registerInUse() {
		this.controller.write("F0", 2);
		if (this.controller.isReadable("F0")) {
			throw new Error("F0 should not be readable");
		}
	}

	@test("Should let F0 be used after 2 cycles")
	registerInUseFor2Cycles() {
		this.controller.write("F0", 2);
		for (let i: number = 0; i < 2; i++) {
			if (this.controller.isReadable("F0")) {
				throw new Error("F0 should not be readable");
			}
			this.controller.tick();
		}
		if (!this.controller.isReadable("F0")) {
			throw new Error("F0 should be readable at cycle 3");
		}
	}

	@test("Should let F2 be used after a clock tick even if it never was used before")
	useRegisterAfterTick() {
		this.controller.isReadable("F2");	// Always true
		this.controller.tick();
		if (!this.controller.isReadable("F2")) {
			throw new Error("F2 should be readable because it never got used.");
		}
	}

}