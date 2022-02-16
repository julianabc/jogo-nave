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

	var velocidade = 5;
	// posição aleátoria dentro desse intervalo para o helicoptero amarelo aparecer
	var posicaoY = parseInt(Math.random() * 334); 

	jogo.timer = setInterval(loop,30); // chama a função loop a cada 30ms

	// numeros decimais das teclas do jogo
	const TECLA = {
		W: 87,
		S: 83,
		D: 68
	}

	function loop() {
		movefundo();
		movejogador();
		moveinimigo1();
		moveinimigo2();
		moveamigo();
	
	} // Fim da função loop()

	//Verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
	
	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});

	
	// funções que são chamadas dentro do loop

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

			// impede que ultrapasse a borda de cima do quadrado
			if (topo<=0) {
				$("#jogador").css("top",topo+10);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {
			let topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo+10);

			// impede que ultrapasse a borda de baixo do quadrado
			if (topo>=434) {	
				$("#jogador").css("top",topo-10);
					
			}
			
		}
		
		if (jogo.pressionou[TECLA.D]) {
			
			//Chama função Disparo	
		}
	
	} // fim da função movejogador()


	function moveinimigo1() {
		// o helicoptero amarelo move-se para a esquerda
		posicaoX = parseInt($("#inimigo1").css("left"));
		
		// atualiza com essa conta de subtração. signfica que o helicoptero vai andar v = 5 a esquerda
		$("#inimigo1").css("left",posicaoX-velocidade);
		
		// atualiza para uma posição aleatoria
		$("#inimigo1").css("top",posicaoY);
		
		// caso o helicoptero bata na borda no lado esquerdo, retorna a posição inicial
		if (posicaoX <= 0) {
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
				
		}
	} // Fim da função moveinimigo1()


	// mesma explicação para a movimentação1
	function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left",posicaoX-3);
				
		if (posicaoX <= 0) {
			$("#inimigo2").css("left",775);
		}
	} // Fim da função moveinimigo2()

	// mesma explicação para a movimentação1
	function moveamigo() {
		posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left",posicaoX+1);
					
		if (posicaoX>906) {
			$("#amigo").css("left",0);
		}
	
	} // fim da função moveamigo()
	
	



} // Fim da função start



