import axios from "axios"

export const server = axios.create({
  baseURL: "https://nlwia-foundations.vercel.app:3333",
})
