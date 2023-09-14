import cors from "cors"
import express from "express"

import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const app = express()
app.use(express.json())
app.use(cors())

// GET METHOD
app.get("/summary/:id", async (request, response) => {
  try {
    // download video
    await download(request.params.id)
    // convert video to audio
    const audioConverted = await convert()
    // send audioConverted to AI transcribe the video and return it 
    const result = await transcribe(audioConverted)
    return response.json({ result })

  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

// POST METHOD
app.post("/summary", async (request, response) => {
  try {
    // Get text from request body and send to summarize
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

// LISTEN LOCALHOST
app.listen(3333, () => console.log("Server is running on port 3333"))
