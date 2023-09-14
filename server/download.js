import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("Downloading video:", videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("The video duration is longer than 60 seconds")
        }
      })
      .on("end", () => {
        console.log("Download finished.")
        resolve()
      })
      .on("error", (error) => {
        console.log("Unable to download video. Error details: ", error)
        reject()
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
