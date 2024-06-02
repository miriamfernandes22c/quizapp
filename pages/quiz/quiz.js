import { verificarTema, trocarTema } from "../../helpers/tema-helper.js"

const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")

let quiz = {}
let pontos = 0
let pergunta = 1


botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema)
})

verificarTema(body, botaoTema)

function alterarAssunto() {
    const divIcone = document.querySelector(".assunto_icone")
    const iconeImg = document.querySelector(".assunto_icone img")
    const assuntoTitulo = document.querySelector(".assunto h1")

    divIcone.classList.add(assunto.toLowerCase())
    iconeImg.setAttribute("src", `../../assets/images/icon-${assunto.toLowerCase()}.svg`)
    iconeImg.setAttribute("alt", `[icone de ${assunto}`)
    assuntoTitulo.innerText = assunto

}


async function buscarPerguntas() {
    const urlDados = "../../data.json"

    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quizzes.forEach(dado => {
            if (dado.title === assunto) {
                quiz = dado
            }

        });
    })


}


function montarPergunta () {
    const main = document.querySelector("main")

    main.innerHTML = `
        <section class="pergunta">
        <div></div>
        <p> Questão ${pergunta} de 10</p>
        <h2>${alterarSinais(quiz.questions[pergunta-1].questions)}</h2>
        <div class="barra_progresso">
        </div>
        <div style="width: ${pergunta * 10}%"></div>
    </section>

    <section class="alternativas">
        <form action="">
            <label for="alternativa_A">
                <input type="radio" id="alternativa_A" name="alternativa">
                <div>
                    <span>A</span>
                    ${alterarSinais(quiz.questions[pergunta-1].options[0])}
                </div>
            </label>

            <label for="alternativa_B">
                <input type="radio" id="alternativa_B" name="alternativa">
                <div>
                    <span>B</span>
                    ${alterarSinais(quiz.questions[pergunta-1].options[1])}
                </div>
            </label>

            <label for="alternativa_C">
                <input type="radio" id="alternativa_C" name="alternativa">
                <div>
                    <span>C</span>
                    ${alterarSinais(quiz.questions[pergunta-1].options[2])}
                </div>
            </label>

            <label for="alternativa_D">
                <input type="radio" id="alternativa_D" name="alternativa">
                <div>
                    <span>D</span>
                    ${alterarSinais(quiz.questions[pergunta-1].options[3])}
                </div>
            </label>

            <button type="submit">Enviar</button>
        </form>
    </section>
    `
}

function alterarSinais () {
    return TextDecoder.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

async function iniciar() {
    alterarAssunto()
    await buscarPerguntas()
    montarPergunta()
}

iniciar() 

