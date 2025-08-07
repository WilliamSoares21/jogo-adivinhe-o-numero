let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}
// Use esse trecho caso venha aenfrentar problemas com o responsive Voice (obs: a área referente no HTML também deve ser alterada)
// if ('speechSynthesis' in window) {
//         let utterance = new SpeechSynthesisUtterance(texto);
//         utterance.lang = 'pt-BR';
//         utterance.rate = 1.2;
//         window.speechSynthesis.speak(utterance);
// } else {
//     console.log("Web Speech API não suportada neste navegador.");
// }


function exibirMensagemInicial() {
  exibirNaTela('h1', "Jogo de adivinhar o número secreto");
  exibirNaTela('p', "Escolha um número entre 1 a 100");
}
exibirMensagemInicial();

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = []
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido
  }
}

function verificarChute() {
  let chute = parseInt(document.querySelector('input').value);
  console.log("O botão foi clicacado");

  if (chute === numeroSecreto) {
    exibirNaTela('h1', 'Acertou');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativa = ` Você acertou o número secreto em ${tentativas} ${palavraTentativa}`;
    exibirNaTela('p', mensagemTentativa);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numeroSecreto) {
      exibirNaTela('p', 'O número secreto é menor');
    } else {
      exibirNaTela('p', 'O número secreto é maior');
    }
    tentativas++;
    limparCampo();
  }
}

function limparCampo() {
  document.querySelector('input').value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}


