import ytdl from 'ytdl-core'
import fs from 'fs'
import { error } from 'console'

export const download = (vídeoID) => new Promise((resolve, reject) => {
    const vídeoURL = "https://www.youtube.com/shorts/" + vídeoID
    console.log("Realizando o download do vídeo:", vídeoID)

    ytdl(vídeoURL, { quality: "lowestaudio", filter: "audioonly"})
    .on(
        "info", 
        (info) => {
            const seconds = info.formats[0].approxDurationMs / 1000

            if(seconds > 60){
                throw new Error("A duração desse vídeo é maior que 60 segundos.")
            }
        }
    ).on("end", () => {
        console.log("Download do vídeo finalizado.")
        resolve()
    })
    .on("error", (error) => {
        console.log(
        "Não foi possivel fazer o donwload do vídeo. Detalhes do erro:", error
        )
        reject(error)
    }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
