import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

// Function to observe when the button is clicked on form
form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "This video does not seem to be a short!")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Obtaining audio text..."
  
  // Transcription receive what server returns
  const transcription = await server.get("/summary/" + videoId)

  // Update content
  content.textContent = "Summarizing..."

  // Request with result from transcription
  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  // Return and update data requested
  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
