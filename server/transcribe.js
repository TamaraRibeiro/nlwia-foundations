import { pipeline } from "@xenova/transformers"

import { transcriptionExample } from "./utils/transcription.js"

export async function transcribe(audio) {
  try {
    // test without AI:
    // return transcriptionExample

    console.log("Transcribing...")
    // Using automatic recognition model (whisper model)
    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    )

    // Passing audio and specify language and what task to be done
    const transcription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "english",
      // language: "portuguese",
      task: "transcribe",
    })

    console.log("Transcription completed successfully.")
    // If it has music, replace with nothing
    return transcription?.text.replace("[Music]", "")
  } catch (error) {
    throw new Error(error)
  }
}
