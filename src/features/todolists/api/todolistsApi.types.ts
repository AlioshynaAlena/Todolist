import z from "zod"
import { TodolistSchema } from "@/features/todolists/model/schemas/schemas.ts"

export type Todolist = z.infer<typeof TodolistSchema>
