import { server } from "./server.js"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    content.classList.add("placeholder")

    const vídeoURL = input.value
    
    if(!vídeoURL.includes("shorts")){
        return content.textContent = "Esse vídeo não parece ser um short."
    }

    const [_, params] = vídeoURL.split("/shorts/")
    const [vídeoID] = params.split("?si") 
    
    content.textContent = "Obtendo o texto do áudio..."

   const transcription = await server.get("/summary/" + vídeoID)

    content.textContent = "Realizando o resumo...Aguarde"

    const summary = await server.post("/summary", {text: transcription.data.result
    })

    content.textContent = summary.data.result
    content.classList.remove("placeholder")
})