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
	//Removido do escopo do controlador pois agora só é chamado através do enviaFilme
	var adicionaFilme = function(){
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

	var atualizaFilme = function(){
		$http.put('/filme', $scope.filme).success(function(){
			//Limpando o formulário
			$scope.filme = new Filme();
		});
	};

	$scope.editaFilme = function(filme){
		//Enviando as informações do filme selecionado para a variável do escopo que está atrelada ao formulário
		$scope.filme = filme;
	};

	//Criando o método enviaFilme, apontado lá no index.ejs, em seu ng-submit
	$scope.enviaFilme =  function(){
		if($scope.filme._id){
			atualizaFilme();
		} else{
			adicionaFilme();
		}
	};
}