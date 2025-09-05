// src/api/auth/verifyOtp.ts
import { api } from '../index'

interface VerifyForgetOtpPayload {
  email: string
  otp: string
}

export const verifyForgetOtpApi = async (data: VerifyForgetOtpPayload) => {
  const res = await api.post('/auth/verify-forgot-otp', data)
  return res.data
}