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

	let jogo = {} // declaração do objeto jogo
	jogo.pressionou = []; // array para as teclas que foram pressionadas

	function loop() {
		movefundo();
		movejogador();
	
	} // Fim da função loop()

	// numeros decimais das teclas do jogo
	const TECLA = {
		W: 87,
		S: 83,
		D: 68
	}

	//Verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
	
	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});

	
	jogo.timer = setInterval(loop,30); // chama a função loop a cada 30ms

	function movefundo() {
		
		// pega a posição atual do fundo game (passa para inteiro)
		esquerda = parseInt($("#fundoGame").css("background-position"));

		// atualiza a posição de fundo game, movendo para a esquerda
		$("#fundoGame").css("background-position",esquerda-1); 
	
	} // fim da função movefundo()

	// verifica se as teclas foram pressionadas para realizar a ação
	function movejogador() {
		
		if (jogo.pressionou[TECLA.W]) {
			let topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo-10);

			// impede que ultrapasse o quadrado
			if (topo<=0) {
				$("#jogador").css("top",topo+10);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {
			let topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo+10);

			if (topo>=434) {	
				$("#jogador").css("top",topo-10);
					
			}
			
		}
		
		if (jogo.pressionou[TECLA.D]) {
			
			//Chama função Disparo	
		}
	
	} // fim da função movejogador()
	



} // Fim da função start



