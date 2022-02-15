// essa sintaxe funciona com o jquery

// para iniciar o jogo
function start() { 

    // esconde a caixa introdutoria do inicio
	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");


	// funções para movimentaçao do fundo do jogo

	let jogo = {}
	
	jogo.timer = setInterval(loop,30); // chama a função loop a cada 30ms
	
	function loop() {
		movefundo();
	
	} // Fim da função loop()

	function movefundo() {
		
		// pega a posição atual do fundo game (passa para inteiro)
		esquerda = parseInt($("#fundoGame").css("background-position"));

		// atualiza a posição de fundo game, movendo para a esquerda
		$("#fundoGame").css("background-position",esquerda-1); 
	
	} // fim da função movefundo()



} // Fim da função start



