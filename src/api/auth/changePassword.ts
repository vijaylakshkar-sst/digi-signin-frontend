// src/api/auth/changePassword.ts
import { api } from '../index'
import axios, { AxiosError } from 'axios'

interface ChangePasswordPayload {
  password: string
  resetToken: string
}

interface ChangePasswordResponse {
  status: boolean
  message: string
  [key: string]: any // Optional: for additional keys if needed
}

export const changePasswordApi = async (
  { password, resetToken }: ChangePasswordPayload
): Promise<ChangePasswordResponse> => {
  try {
    const res = await api.post<ChangePasswordResponse>(
      '/auth/change-password',
      { password },
      {
        headers: {
          resetToken: resetToken || '',
        },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
