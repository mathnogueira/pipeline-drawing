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

