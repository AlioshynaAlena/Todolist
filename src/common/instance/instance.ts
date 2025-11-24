import axios from "axios"

const token = "199ac75f-d715-4e9b-ba28-53076e624095"
const apiKey = "4130b55a-ac7b-4bb6-8682-c420bbf36899"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  headers: {
    Authorization: `Bearer ${token}`,
    "API-KEY": apiKey,
  },
})
