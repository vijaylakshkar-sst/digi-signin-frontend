// src/api/auth/verifyOtp.ts
import { api } from '../index'

interface VerifyOtpPayload {
  email: string
  otp: string
}

export const verifyOtpApi = async (data: VerifyOtpPayload) => {
  const res = await api.post('/auth/verify-otp', data)
  return res.data
}