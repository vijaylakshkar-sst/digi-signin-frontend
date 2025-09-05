// src/api/auth/changePassword.ts
import { api } from '../index'

interface ChangePasswordPayload {
  password: string
  resetToken: string
}

export const changePasswordApi = async ({ password, resetToken }: ChangePasswordPayload) => {
  try {
    const res = await api.post(
      '/auth/change-password',
      { password },
      {
        headers: {
          resetToken: resetToken || '',
        },
      }
    )
    return res.data
  } catch (err: any) {
    return { status: false, message: err?.response?.data?.message || err.message }
  }
}
