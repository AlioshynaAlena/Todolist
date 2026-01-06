import { LoginInputs } from "@/features/auth/lib/schemas/types.ts"
import { instance } from "@/common/instance/instance.ts"
import { BaseResponse } from "@/common/types"

export const authApi = {
  login(payload: LoginInputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("/auth/login", payload)
  },
}
