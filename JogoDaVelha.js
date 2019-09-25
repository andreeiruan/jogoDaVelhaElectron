class JogoDaVelha {
    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.playerVez = [player1, false]
        this.placar = {}
        this.jogadas = []
        this.tabuleiro = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    }
    pegarPlacar(url) {
        fetch(url)
            .then(response => response.json())
            .then((dados) => {
                this.placar = dados
            })
    }

    construirTabuleiro() {
        const divJogo = document.createElement('div')
        divJogo.setAttribute('class', 'jogo')
        var divBody = document.createElement('div')
        divBody.setAttribute('class', 'body')
        divBody.setAttribute('id', 'body')

        divBody.appendChild(divJogo)

        for (let i = 0; i < 9; i++) {
            const campo = document.createElement('input')
            campo.setAttribute('class', 'campo')
            campo.setAttribute('id', `${i}`)
            divJogo.appendChild(campo)
        }
        const botaoProximo = document.createElement('button')
        botaoProximo.innerHTML = 'Proximo'
        botaoProximo.setAttribute('id', 'botaoProximo')
        divBody.appendChild(botaoProximo)
        document.body.insertAdjacentElement('beforeend', divBody)
    }

    validarJogada(jog) {
        if (jog > 8 || jog < 0) {
            return false
        } else {
            if (this.tabuleiro[jog] === 'X' || this.tabuleiro[jog] === 'O') {
                return false
            } else {
                return true
            }
        }
    }
    FazerJogada() {
        const campos = document.querySelectorAll('.campo')
        campos.forEach((c, i) => {
            c.addEventListener('click', () => {
                if (this.jogada(i, this.playerVez[0], this.playerVez[1])) {
                    c.setAttribute('value', this.playerVez[0])
                    c.style.backgroundColor = 'rgb(240, 240, 240)'
                    this.playerVez[1] = true
                }
            })
        })
    }

    jogada(pos, player, jogou) {
        if (jogou === true) {
            alert('Você já fez sua jogada!!!')
        } else {
            if (this.validarJogada(pos) === true) {
                this.jogadas.push(0)
                this.tabuleiro[pos] = player[0]
                return true
            } else {
                alert('Essa jogada é invalida!!!')
            }
        }

    }

    verificacao() {
        let ganhador
        if (this.tabuleiro[0] === this.tabuleiro[1] && this.tabuleiro[1] === this.tabuleiro[2]) {
            ganhador = this.tabuleiro[0]
        } else if (this.tabuleiro[3] === this.tabuleiro[4] && this.tabuleiro[4] === this.tabuleiro[5]) {
            ganhador = this.tabuleiro[3]
        } else if (this.tabuleiro[6] === this.tabuleiro[7] && this.tabuleiro[7] === this.tabuleiro[8]) {
            ganhador = this.tabuleiro[6]
        } else if (this.tabuleiro[2] === this.tabuleiro[5] && this.tabuleiro[5] === this.tabuleiro[8]) {
            ganhador = this.tabuleiro[2]
        } else if (this.tabuleiro[0] === this.tabuleiro[4] && this.tabuleiro[4] === this.tabuleiro[8]) {
            ganhador = this.tabuleiro[0]
        } else if (this.tabuleiro[1] === this.tabuleiro[4] && this.tabuleiro[4] === this.tabuleiro[7]) {
            ganhador = this.tabuleiro[1]
        } else if (this.tabuleiro[0] === this.tabuleiro[3] && this.tabuleiro[3] === this.tabuleiro[6]) {
            ganhador = this.tabuleiro[0]
        } else if (this.tabuleiro[2] === this.tabuleiro[4] && this.tabuleiro[4] === this.tabuleiro[6]) {
            ganhador = this.tabuleiro[2]
        } else {
            if (this.jogadas.length === 9) {
                ganhador = 'Empate'
            }
        }
        return this.VerGanhador(ganhador)
    }

    VerGanhador(ganhador) {
        if (ganhador === this.player1) {
            this.placar.vitoriasPlayer1 += 1
            alert('Player 1 ganhou a partida!!!')


        } else if (ganhador === this.player2) {
            this.placar.vitoriasPlayer2 += 1
            alert('Player 2 ganhou a partida!!!')


        } else if (ganhador === 'Empate') {
            this.placar.empates += 1
            alert('A partida terminou em empate!!!')


        }
        if (ganhador) {
            const fs = require('fs')
            const placarJson = JSON.stringify(this.placar, null, '\t')
            fs.writeFile('placar.json', placarJson, (err) => {
                if (err) return console.error(err)
                else { return window.location.reload() }
            })

        }


    }

    mudarVezJogador() {
        const botaoProximo = document.getElementById('botaoProximo')
        const divJogadorDaVez = document.createElement('h1')
        const divBody = document.getElementById('body')
        divBody.insertAdjacentElement('afterbegin', divJogadorDaVez)

        let playerDaVez = this.player1
        botaoProximo.addEventListener('click', () => {
            if (playerDaVez === this.player1) {
                this.playerVez[1] = false
                playerDaVez = this.player2
                divJogadorDaVez.innerHTML = `Vez do Player 2!`
                this.playerVez[0] = this.player2
            } else {
                this.playerVez[1] = false
                playerDaVez = this.player1
                divJogadorDaVez.innerHTML = `Vez do Player 1!`
                this.playerVez[0] = this.player1
            }
            this.verificacao()
        })
    }


}

module.exports = JogoDaVelha