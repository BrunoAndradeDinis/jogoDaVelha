var info = document.getElementById("info")
var campos = document.querySelectorAll("td")

function iniciar() {
    info.classList.remove("oculto") // Deixando os campos clicáveis.

    limpajogo()

    let button = document.querySelector('button') // Alterando o nome e a cor do button.
    button.classList.remove("btn-dark")
    button.classList.add("btn-danger")
    button.textContent = "Reiniciar"
}

// Aqui vai ser o evendo de click "X" e "O"
campos.forEach(campo => {
    campo.addEventListener("click", evento => {
        let elemento = evento.target // Pegamos o elemento td no qual manipularemos.

        if (elemento.classList.contains("blocked")) return console.log(elemento.classList) // se não tiver iniciado o jogo não vai ter como clicar 

        let jogador = document.querySelector(".jogador strong") // pegando a informação de qual jogador é a vez.
        elemento.textContent = jogador.textContent // Atribuindo o texto ao elemento
        elemento.style.color = jogador.style.color // A cor
        elemento.classList.add("blocked") // Deixando ele bloqueado, pois o outro jogador quem selecionou.

        let ganhador = validaJogada() // Validação caso tenha atingido a vitória
        if (ganhador) { // vai retornar true para remover a classe oculto e aparecer quem é o vencedor.
            document.querySelector(".vencedor").classList.remove("oculto")
            document.querySelector(".vez").classList.add("oculto")
            document.querySelector(".jogador").classList.add("ganhou")
            // Aqui bloqueia para não ter continuidade no jogo.
            campos.forEach(campo => campo.classList.add("blocked"));
            return
        }
        // Alternação de jogadores para iniciar o jogo.
        if (jogador.textContent == "O") {
            jogador.textContent = "X"
            jogador.style.color = "blue"
        } else {
            jogador.textContent = "O";
            jogador.style.color = "red";
        }

    })

})

function validaJogada() {
    // As combinações para comparar com os td, no caso o campos.length posição 0-8
    var combinacoes = [
        // Horizontais
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Verticais
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonais
        [0, 4, 8],
        [2, 4, 6]
    ]
    var ganhador = null
    // Aqui a mágica acontece, as combinações que vai rodar dentro do foreach nas posições
    combinacoes.forEach(combinacao => {
        // Atribuição dos valores da posição de cada td aplicado nas combinações.
        let valor1 = campos[combinacao[0]].textContent
        let valor2 = campos[combinacao[1]].textContent
        let valor3 = campos[combinacao[2]].textContent
        console.log(valor1, valor2, valor3)

        if (!valor1 || !valor2 || !valor3) return // toda vez que for diferente ele vai retornar e não dar continuidade na validação.

        if (valor1 === valor2 && valor2 === valor3) { // Aqui é onde ele localiza a combinação de quem venceu.
            ganhador = valor1 // lembra que o valor tava null, agora ele recebe o valor do ganhador.

            let backgrond = ""
            // Atribuindo as cores de background
            if (valor1 == "X") backgrond = "blue"
            else backgrond = "red"

            campos[combinacao[0]].style.cssText = `background-color: ${backgrond}; color: white;`
            campos[combinacao[1]].style.cssText = `background-color: ${backgrond}; color: white;`
            campos[combinacao[2]].style.cssText = `background-color: ${backgrond}; color: white;`
        }
    })

    // Validação da velha
    let espacosEmBranco = 0
    campos.forEach(campo => {
        if (campo.textContent === "") espacosEmBranco++
        console.log(espacosEmBranco)
    })
    // Se o ganhador for true e os espaços em branco for igual a "0" então deu velha
    console.log(!ganhador)
    if (!ganhador && espacosEmBranco === 0) {
        document.querySelector(".velha").classList.remove("oculto")
        document.querySelector(".vez").classList.add("oculto")
        document.querySelector(".jogador").classList.add("oculto")
    }
    return ganhador
}

function limpajogo() {
    campos = document.querySelectorAll("td")
    // Aqui vai adicionar o atributo blocked no hover do mouse.
    campos.forEach(function (campo) {
        campo.classList.remove("blocked")
    });
    // Aqui vai tirar o "X" e "O" de todos os td
    campos.forEach(campo => {
        campo.textContent = ""
        campo.style.cssText = ""
        campo.style.color = ""
    })
    // Oculta o vencedor caso ja tenha algum.
    document.querySelector(".vez").classList.remove("oculto")
    document.querySelector(".vencedor").classList.add("oculto")
    document.querySelector(".velha").classList.add("oculto")
    document.querySelector(".jogador").classList.remove("oculto")
    document.querySelector(".jogador").classList.remove("ganhou")
}