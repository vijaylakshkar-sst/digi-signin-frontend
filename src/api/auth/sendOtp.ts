// src/api/auth/sendOtp.ts
import { api } from '../index'

interface SendOtpPayload {
  email: string
  mobile?: string
  type: 'register' | 'forgot'
}

export const sendOtpApi = async (data: SendOtpPayload) => {
  const res = await api.post('/auth/send-otp', data)
  return res.data
}