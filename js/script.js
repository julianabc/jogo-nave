// essa sintaxe funciona com o jquery

// para iniciar o jogo
function start() { 

    // esconde a caixa introdutoria do inicio
	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");







	// funções para movimentaçao do fundo do jogo

	let jogo = {} // declaração do objeto jogo
	jogo.pressionou = []; // array para as teclas que foram pressionadas

	var velocidade = 5;
	// posição aleátoria dentro desse intervalo para o helicoptero amarelo aparecer
	var posicaoY = parseInt(Math.random() * 334); 

	var podeAtirar = true; // o jogador pode atirar
	var fimdejogo = false; // se o jogo ja terminou de ser feito

	/* placar do jogo */
	var pontos=0;
	var salvos=0;
	var perdidos=0;

	// barra de energia
	var energiaAtual = 3;
	


	// numeros decimais das teclas do jogo
	const TECLA = {
		W: 87,
		S: 83,
		D: 68
	}


	jogo.timer = setInterval(loop,30); // chama a função loop a cada 30ms

	function loop() {
		movefundo();
		movejogador();
		moveinimigo1();
		moveinimigo2();
		moveamigo();
		colisao();
		placar();
		energia();
	
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
			disparo();	
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
	
	

	// função relacionada ao disparo
	function disparo() {
	
		if (podeAtirar == true) {
			
			podeAtirar = false; // impossibilita de atirar novamente
			
			// pega as posições do jogador, pois o tiro tem que acontecer na mesma reta
			topo = parseInt($("#jogador").css("top"))
			posicaoX= parseInt($("#jogador").css("left"))

			// faz com que o tiro saia a frente do helicoptero jogador
			tiroX = posicaoX + 190;
			topoTiro= topo + 37;

			// cria a div para o disparo
			$("#fundoGame").append("<div id='disparo'></div");

			// atualiza disparo com as posições já certas
			$("#disparo").css("top",topoTiro);
			$("#disparo").css("left",tiroX);
			

			// executa a função de disparo a cada 30ms
			var tempoDisparo = window.setInterval(executaDisparo, 30);
		
		} // Fecha podeAtirar

	 
		function executaDisparo() {
			// pega a posição do disparo
			posicaoX = parseInt($("#disparo").css("left"));

			// controla a velocidade do tiro
			$("#disparo").css("left",posicaoX+15); 
			
			// caso o disparo chegue ao final da tela ao lado direito, pode atirar novamente
			if (posicaoX > 900) {
				// limpa o intervalo
				window.clearInterval(tempoDisparo);
				tempoDisparo = null;

				// remove o disparo da tela e libera para atirar novamente
				$("#disparo").remove();
				podeAtirar = true;
						
			}
		} // Fecha executaDisparo()
	} // Fecha disparo()


	// em relação as colisoes no jogo - (talvez trabalhar melhor esse codigo depois)
	function colisao() {
		// colisões possiveis
		var colisao1 = ($("#jogador").collision($("#inimigo1")));
		var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#disparo").collision($("#inimigo1")));
		var colisao4 = ($("#disparo").collision($("#inimigo2")));
		var colisao5 = ($("#jogador").collision($("#amigo")));
		var colisao6 = ($("#inimigo2").collision($("#amigo")));
		
		// se houver colisão... 
		if (colisao1.length > 0) {
			// pega as posições do inimigo 1 (helicoptero amarelo)
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));

			// passa parametros para a função que faz a colisão acontecer
			explosao1(inimigo1X,inimigo1Y);
			
			// reposiciona o inimigo 1
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);

			// diminui a barra de energia
			energiaAtual--;
		}

		// jogador com o inimigo2 
		if (colisao2.length > 0) {
			// pega as posisções do inimigo 2 
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));

			// passa parametros para a função que faz a colisão acontecer
			explosao2(inimigo2X,inimigo2Y);
					
			$("#inimigo2").remove();
				
			reposicionaInimigo2();

			// diminui a barra de energia
			energiaAtual--;
				
		}


		// disparos com o inimigo 1
		if (colisao3.length > 0) {

			pontos += 100; // somar pontos no placar

			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
				
			explosao1(inimigo1X,inimigo1Y);
			$("#disparo").css("left",950);
				
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
				
		}

		// disparos com o inimigo 2
		if (colisao4.length > 0) {

			pontos += 50; // somar pontos no placar

			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			
			$("#inimigo2").remove();
		
			explosao2(inimigo2X,inimigo2Y);
			$("#disparo").css("left",950);
			
			reposicionaInimigo2();
				
		}

		// jogador com o amigo
		if (colisao5.length>0) {

			reposicionaAmigo();
			$("#amigo").remove();
			salvos++; // adiciona um ponto a salvos
		}

		//Inimigo2 com o amigo
		if (colisao6.length>0) {

			amigoX = parseInt($("#amigo").css("left"));
			amigoY = parseInt($("#amigo").css("top"));
			explosao3(amigoX,amigoY);
			
			$("#amigo").remove();
			
			reposicionaAmigo();

			perdidos++; // adiciona um ponto a perdidos
		}
		
	} // Fim da função colisao()
	


	/* --> explosões:  */

	// a primeira explosão 
	function explosao1(inimigo1X, inimigo1Y) {
		// cria div para a primeira explosão 
		$("#fundoGame").append("<div id='explosao1'></div");
		// atualiza com a imagem que representa a explosão
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");


		let div = $("#explosao1");

		// atribui css, incluindo animação ao explosão1
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		div.animate({width:200, opacity:0}, "slow");

		// limpa a explosao da tela
		
		let tempoExplosao = window.setInterval(removeExplosao, 1000);
		
		function removeExplosao() {
			div.remove(); // remove explosão1
			window.clearInterval(tempoExplosao); // limpa intervalo
			tempoExplosao = null; // zera variável
				
		}	
	} // Fim da função explosao1()


	// explosão 2! mesma explicaçao da anterior
	function explosao2(inimigo2X, inimigo2Y) {
		
		$("#fundoGame").append("<div id='explosao2'></div");
		$("#explosao2").css("background-image", "url(imgs/explosao.png)");
		
		let div2 = $("#explosao2");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X);
		div2.animate({width:200, opacity:0}, "slow");
		
		let tempoExplosao2=window.setInterval(removeExplosao2, 1000);
		
		function removeExplosao2() {
			div2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2=null;
				
		}		
			
	} // Fim da função explosao2()


	//Explosão3
	function explosao3(amigoX,amigoY) {
		$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
		$("#explosao3").css("top",amigoY);
		$("#explosao3").css("left",amigoX);
		
		var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
		
		function resetaExplosao3() {
			$("#explosao3").remove();
			window.clearInterval(tempoExplosao3);
			tempoExplosao3 = null;
				
		}
	
	} // Fim da função explosao3


	


	/* reposicionamentos */

	//Reposiciona Inimigo2
	
	function reposicionaInimigo2() {

		// reposiciona após 5 segundos
		var tempoColisao4 = window.setInterval(reposiciona4, 5000);
		
		// depois desse tempo... 
		function reposiciona4() {
			// limpa o tempo e zera a variavel
			window.clearInterval(tempoColisao4);
			tempoColisao4 = null;
			
			// se o jogo não tiver terminado...
			if (fimdejogo == false) {
				// cria o inimigo dois
				$("#fundoGame").append("<div id=inimigo2></div");
			}
				
		}	
	}	
	
	// Reposiciona Amigo
	
	function reposicionaAmigo() {
		// reposiciona após 6 segundos
		var tempoAmigo = window.setInterval(reposiciona6, 6000);
		
		// depois desse tempo...
		function reposiciona6() {
			// limpa o tempo e zera a variavel
			window.clearInterval(tempoAmigo);
			tempoAmigo = null;
			
			// se o jogo não tiver terminado...
			if (fimdejogo == false) {
				// cria o inimigo dois
				$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
		
			}
		
		}
	
	} // Fim da função reposicionaAmigo()


	/* placar do jogo: */
	function placar() {
	
		$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
		
	} //fim da função placar()



	/* Barra de energia */

function energia() {
	
	if (energiaAtual == 3) {
		
		$("#energia").css("background-image", "url(imgs/energia3.png)");
	}

	if (energiaAtual == 2) {
		
		$("#energia").css("background-image", "url(imgs/energia2.png)");
	}

	if (energiaAtual == 1) {
		
		$("#energia").css("background-image", "url(imgs/energia1.png)");
	}

	if (energiaAtual == 0 ) {
		
		$("#energia").css("background-image", "url(imgs/energia0.png)");
		
		//Game Over
	}

} // Fim da função energia()




} // Fim da função start





