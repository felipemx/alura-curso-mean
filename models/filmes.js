var mongoose = require('mongoose');

//Conecta em uma base MongoDB (espero que a crie no caso de não existir...)
mongoose.connect('mongodb://localhost/mean');

//Definindo o schema da coleção
var definicaoSchema = new mongoose.Schema({
	titulo: {
		type: String,
		required: true
	},
	autor: {
		type: String,
		required: true
	},
	ano: {
		type: String
	}
});

/*Criando o model em si: me parece que SEMPRE deve ser apontar o primeiro atributo para o MESMO nome da variável.
No segundo atributo é utilizado o schema criado acima.*/
var filmeModel = mongoose.model('filmeModel', definicaoSchema);

//Expondo o serviço
module.exports = filmeModel;