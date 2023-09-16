import axios from "axios"

export const server = axios.create({
  baseURL: "http://127.0.0.1:3333/",
  // baseURL: "http://localhost:3333",
})
