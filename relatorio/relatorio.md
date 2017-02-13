# Instalação

Para instalar o programa, você tem 2 alternativas:

1. Compilá-lo a partir do código fonte, para isso, basta seguir os passos descritos em ```Compilar código fonte```
2. Utilizar a versão pré-compilada localizada na pasta ```dist```.

## Compilar codigo fonte

Para compilar o programa, você necessitará dos seguintes programs:
- NodeJS com NPM (Node Package Manager)
- Bower: basta executar ```sudo npm install -g bower```

Com tais programas instalados, navegue até a pasta contendo o projeto e execute os seguintes
comandos:

```bash
npm install
bower install
gulp build
```

Isso deverá gerar uma pasta chamada ```dist```, a qual contém a seguinte estrutura:
```
 \---fonts/
 \---js/
     \---app.js
     \---components.js
 \---style/
     \---app.css
     \---components.css
 \---index.html

```

## Instalando o programa em um servidor HTTP
Para utilizar esse programa em um servidor HTTP, basta você copiar a pasta
```dist``` para a sua pasta ```www```. Por exemplo: Digamos que você queira criar uma subpasta ```pipeline``` em seu servidor HTTP local. Basta executar tal comando:

```bash
sudo cp -r ./dist /var/www/pipeline

```