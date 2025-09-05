// src/api/auth/register.ts
import { api } from '../index'

interface RegisterPayload {
  fullname: string
  email: string
  mobile: string
  address: string
  password: string
}

export const registerApi = async (data: RegisterPayload) => {
  const res = await api.post('/auth/register', data)
  return res.data
}
