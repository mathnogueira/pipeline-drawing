import { InstructionDelay } from './instructions/instruction';
import { PipelineRegisters } from './pipeline-register';
import {Canvas} from "./drawing/canvas";
import {PipelineTableComponent} from "./drawing/components/pipeline-table.js";
import {Instruction} from "./drawing/instruction";
import {Pipeline} from "./pipeline";

declare var angular: any;

(function() {


	angular
		.module("app", [])
		.controller("PipelineController", PipelineController);

	function PipelineController($scope) {
		let vm = this;

		vm.toggleConfig = toggleConfig;
		vm.editarLatencia = editarLatencia;
		vm.aplicarLatencia = aplicarLatencia;
		vm.exportJSON = exportJson;
		vm.importJSON = importJson;
		vm.adicionarInstrucao = adicionarInstrucao;
		vm.removerInstrucao = removerInstrucao;
		vm.executar = executar;
		vm.exportImage = exportImage;

		vm.textInstructions = [];
		vm.auxLatencias = [];
		vm.edicaoLatencia = [];
		vm.instrucoes = [];
		vm.operados = {};
		vm.adiantamento = false;

		init();
		let memInstructions: Array<string> = ["ld", "sd", "lw", "sw"];
		let branchInstructions: Array<string> = ["beq", "bnez"];

		let tipoInstrucao;
		let canvas;

		function init() {
			// Pega as latencias
			vm.latencias = [];
			for (let i in InstructionDelay) {
				vm.latencias.push({ 
					nome: i,
					latencia: InstructionDelay[i]
				});
			}
			vm.instrucaoAtual = "addd";
			$scope.$watch(() => vm.instrucaoAtual, mostrarCampos);
		}

		function importJson() {
			let latencia = JSON.parse(vm.latenciaJson);
			vm.latencias = latencia.config;
		}

		function exportJson() {
			let exportObj = {
				config: angular.copy(vm.latencias)
			};
			vm.latenciaJson = JSON.stringify(exportObj);
		}

		function editarLatencia(instrucao) {
			vm.auxLatencias[instrucao.nome] = instrucao.latencia;
			vm.edicaoLatencia[instrucao.nome] = true;
		}

		function aplicarLatencia(instrucao) {
			instrucao.latencia = +vm.auxLatencias[instrucao.nome];
			vm.edicaoLatencia[instrucao.nome] = false;
		}

		function toggleConfig() {
			vm.showConfig = !vm.showConfig;
		}

		function mostrarCampos(instrucao) {
			if (instrucao === undefined) return;
			// Reseta campos
			vm.mostrarRt = false;
			vm.mostrarRs = false;
			vm.mostrarRd = false;
			vm.mostrarDeslocamento = false;
			vm.operandos = {};
			if (memInstructions.indexOf(instrucao) >= 0) {
				vm.mostrarRt = true;
				vm.mostrarRs = true;
				vm.mostrarDeslocamento = true;
				tipoInstrucao = "mem";
			} else if (branchInstructions.indexOf(instrucao) >= 0) {
				vm.mostrarRs = true;
				if (instrucao != "bnez")
					vm.mostrarRt = true;
				vm.mostrarDeslocamento = true;
				tipoInstrucao = "branch";
			} else {
				vm.mostrarRt = true;
				vm.mostrarRs = true;
				vm.mostrarRd = true;
				tipoInstrucao = "reg";
			}
		}

		function adicionarInstrucao() {
			if ($scope.operandos.$invalid) {
				alert("Preencha todos os campos antes de adicionar uma instrução!");
				return;
			}
			let texto = '' + vm.instrucaoAtual;
			if (tipoInstrucao == "mem") {
				texto += ` ${vm.operandos.rt} ${vm.operandos.deslocamento}(${vm.operandos.rs})`;
			} else if (tipoInstrucao == "branch") {
				if (vm.instrucaoAtual == "beq")
					texto += ` ${vm.operandos.rs} ${vm.operandos.rt} ${vm.operandos.deslocamento}`;
				else
					texto += ` ${vm.operandos.rs} ${vm.operandos.deslocamento}`;
			} else {
				texto += ` ${vm.operandos.rd} ${vm.operandos.rs} ${vm.operandos.rt}`;
			}
			
			vm.instrucoes.push({ texto: texto });
		}

		function removerInstrucao(instrucao) {
			let index = vm.instrucoes.indexOf(instrucao);
			vm.instrucoes.splice(index, 1);
		}

		function executar() {
			// Aplica as latencias
			for (let i in InstructionDelay) {
				InstructionDelay[i] = +encontrarLatencia(i);
			}
			vm.executado = true;
			vm.txtInstructions = [];
			for (let i = 0; i < vm.instrucoes.length; i++) {
				vm.txtInstructions.push(vm.instrucoes[i].texto);
			}
			if (canvas && canvas.clear) {
				canvas.clear();
			}
			drawPipeline();
		}

		function drawPipeline() {
			console.log(vm.adiantamento);
			let pipelineExecutor = new Pipeline(vm.txtInstructions, vm.adiantamento);
			let parsedInstructions = pipelineExecutor.run();
			let maxCycles: number = 0;
			for (let i: number = 0; i < parsedInstructions.length; i++) {
				let lastCycle = parsedInstructions[i]["wb"];
				if (lastCycle > maxCycles)
					maxCycles = lastCycle;
			}
			let pipeline = new PipelineTableComponent(maxCycles, parsedInstructions.length);
			console.log(pipeline);
			canvas = new Canvas("pipeline", pipeline.width + 140, pipeline.height + 45);

			for (let i: number = 0; i < parsedInstructions.length; i++) {
				// Cria uma instrucao
				let instruction = new Instruction({
					instruction: vm.txtInstructions[i],
					execution: parsedInstructions[i],
					unit: parsedInstructions[i]["unit"]
				});

				pipeline.addInstruction(instruction);
			}

			canvas.initialize();
			canvas.add(pipeline);
			canvas.render();
		}

		function encontrarLatencia(nome) {
			for (let i = 0; i < vm.latencias.length; i++) {
				console.log(vm.latencias[i], nome);
				if (vm.latencias[i].nome == nome)
					return vm.latencias[i].latencia;
			}

			return 1;
		}

		function exportImage() {
			canvas.toImage();
		}
	}
	
})();