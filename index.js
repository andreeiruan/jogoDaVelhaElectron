function definirJogadores() {
    const escolhaPlayer1 = document.getElementById('escolha')
    const divEscolha = document.getElementById('esco')
    const escolher = document.getElementById('escolhido')
    escolher.addEventListener('click', (e) => {
        if (escolhaPlayer1.value.toUpperCase() === 'X') {
            player1 = 'X'
            player2 = 'O'

        } else if (escolhaPlayer1.value.toUpperCase() === 'O') {
            player1 = 'O'
            player2 = 'X'
        } else {
            e.preventDefault()
            return alert(`Escolha apenas "X" ou "O" para jogar!!!`)
        }
        const p = [player1, player2]
        Jogo = new JogoDaVelha(p[0], p[1])
        document.body.removeChild(divEscolha)


        Jogo.pegarPlacar('placar.json')
        Jogo.construirTabuleiro()
        Jogo.mudarVezJogador()
        Jogo.FazerJogada()
    })

}
const JogoDaVelha = require('./JogoDaVelha')
let Jogo
definirJogadores()