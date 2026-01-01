import { z } from "zod"
import { loginSchema } from "@/features/auth/lib/schemas/loginSchema.ts"

export type LoginInputs = z.infer<typeof loginSchema>
