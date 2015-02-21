var Filmes = require('../models/filmes');

exports.index = function(req, res){
	//Renderiza o index.ejs
	res.render('index');
};

exports.lista = function(req, res){
	//Assinatura: find({critérios}, callback(error, object){})
	Filmes.find({}, function(erro, filmes){
		if(erro){
			return console.log(erro);
		}

		//Retornando a consulta em formato JSON
		res.json(filmes);
	});
};

exports.grava = function(req, res){
	//Instanciando o modelo de Filme (importado na primeira linha, através do require)
	var filme = new Filmes(req.body);

	//Método de salvar: save(callback(errorMsg, object){})
	filme.save(function(erro, filme){
		if(erro){
			return console.log(erro);
		}
		//Enviando mensagem para o console do servidor
		res.send(filme);
	});
};

exports.deleta = function(req, res){
	//O 'params' é onde está armazenado o objeto passado na rota, sendo assim, cada atributo do objeto passado, é acessado como um atributo do params
	var id = req.params.id;

	Filmes.findByIdAndRemove(id, function(erro, filme){
		res.send('Filme' + filme.titulo + ' removido com sucesso');
	});
};

exports.atualiza = function(req, res){
	var id = req.body._id;
	//Remove o id do objeto que será passado para o banco atualizar (para não acontecer de atualizar o id)
	delete req.body._id;

	Filmes.findByIdAndUpdate(id, req.body, function(erro, filme){
		res.send('Filme ' + filme.titulo + ' atualizado!');
	});
};