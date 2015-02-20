function FilmeController($http, $scope) {
	
	//Chama a rota 'lista' do express, definida em routes/index.js
	$http.get('/lista').success(function(retorno){
		//Atribui o retorno à variável do escopo da página
		$scope.filmes = retorno;
	});
	
	//Criando um modelo de filme
	function Filme(){
		this.nome = '';
		this.autor = '';
		this.ano = '';
	}
	//Disponibilizando o modelo criado no escopo do recurso que o utiliza
	$scope.filme = new Filme();

	//Criando o método adicionaFilme, apontado lá no index.ejs, em seu ng-submit
	$scope.adicionaFilme = function(){
		//Chama a rota 'grava' do express, definida em routes/index.js
		$http.post('/grava', $scope.filme).success(function(retorno){
			//Atualizando a coleção de filmes na view
			console.log(retorno);
			$scope.filmes.push(retorno);
			//Limpando o formulário
			$scope.filme = new Filme();
		});
	};

	//Criando o método mostraFilme, apontado lá no index.ejs, em seu ng-click
	$scope.mostraFilme = function(filme){
		$scope.filmeSelecionado = filme;
	};

	//Criando o método deletaFilme, apontado no index.ejs, em um ng-click após o dl
	$scope.deletaFilme = function(filme){
		$http.delete('/filme/' + filme._id).success(function(retorno){
			$scope.filmeSelecionado = null;

			var posicao = $scope.filmes.indexOf(filme);
			$scope.filmes.splice(posicao, 1);
		});
	};
}