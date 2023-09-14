import { pipeline } from "@xenova/transformers"
import { summaryExample } from "./utils/summary.js"

export async function summarize(text) {
  try {
    // to test without AI:
    // return summaryExample
    
    console.log("Summarizing...")

    // Summarize with AI model
    const generator = await pipeline("summarization", "Xenova/distilbart-cnn-12-6")

    const output = await generator(text)

    console.log("Summary created successfully!")
    return output[0].summary_text
  } catch (error) {
    console.log("Error creating summary.", error)
    throw new Error(error)
  }
}