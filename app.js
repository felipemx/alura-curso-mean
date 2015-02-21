var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//Instanciando Express.JS
var app = express();

//Configurando parâmetros da aplicação
app.set('views', path.join(__dirname, 'views'));
//Dizendo ao Node.JS que os templates a serem injetados na aplicação serão com base no EJS
app.set('view engine', 'ejs');
//Configurando variável para armazenar a porta onde ficará o servidor
app.set('port', process.env.PORT || 3000);

//Utiliza a pasta routes como resource. 
//Queria entender o porquê de não apontar diretamente para o arquivo, visto que mais abaixo são chamadas três rotas definidas no index sem mencioná-lo diretamente.
var routes = require('./routes');

//Fazendo o parse do retorno das requisições para o formato JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    					extended: true
					}
				)
);

//Fazendo com que o Node.JS entenda que deve export a pasta public como um repositório de JavaScript client-side e não server-side
app.use(express.static(path.join(__dirname, 'public')));

//Definindo ações REST
app.get('/', routes.index);
app.get('/lista', routes.lista);
app.post('/grava', routes.grava);
app.delete('/filme/:id', routes.deleta);
app.put('/filme', routes.atualiza);

//Startando servidor
var server = app.listen(
				app.get('port'), function() {
					console.log('Servidor iniciado em: ' + server.address().port);
				});