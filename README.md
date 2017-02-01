# pipeline-drawing
Javascript program that receives some MIPS instructions and draw the pipeline execution

## Como desenvolver:

1) Baixando as dependencias:
```bash
$ npm install
$ bower install
```

2) Compilando os arquivos fonte (src)
```bash
gulp build ## Constroi toda a aplicação;
gulp pug   ## Compila os arquivos pug para HTML;
gulp less  ## Compila os arquivos less para CSS;
gulp babel ## Compila o JS es6 para es5 (portabilidade);
gulp watch ## Vigia todos os arquivos do projeto e compila somente os que você alterar.
```

É recomendado que você utilize o `gulp watch` enquanto estiver desenvolvendo, pois assim, você não precisa ficar compilando a aplicação toda vez que fizer uma alteração.

## Organização das pastas

1) `src`: Pasta contendo todos os arquivos fonte;

2) `build`: Pasta contendo os arquivos compilados (você testa esses aqui);

3) `dist`: Pasta contendo os arquivos prontos para serem subidos em produção.

## Modulos do projeto

### Módulo de desenho
Exemplo de entrada de uma pipeline para o módulo:

```javascript
{
	// A lista de instruções deve estar na ordem de despacho
	// do pipeline.
	instructions: [
		{ instruction1 },
		{ instruction2 },
		{ instruction3 }
	],
	stalls: [
		{ stall1 },
		{ stall2 }.
		{ stall3 }
	],
	forward: [
		{ forward1 },
		{ forward2 },
		{ forward3 }
	]
}
```

Estrutura de uma `instruction`:

```javascript
// Instrução de ADD
{
	command: 'ADD.D $1, $2, $3', 	// Comando executado
	start: 1,						// Número do ciclo que a instrução teve início,
	executionCost: 4,				// Número de ciclos gasto na execução
}
```

Estrutura de um `stall`:

```javascript
{
	instructionNumber: 2,			// Número da instrução que gerou a bolha
	startCycle: 3,					// Número do ciclo (a partir do início da instrução) que a bolha foi gerada
	numberCycles: 2,				// Número de bolhas geradas a partir do startCycle
}
```

Estrutura de um `forward`:

```javascript
{
	// A definir
}
```
