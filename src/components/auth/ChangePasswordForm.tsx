'use client'

import React, { useEffect, useState } from 'react'
import Input from '@/components/form/input/InputField'
import Label from '@/components/form/Label'
import Button from '@/components/ui/button/Button'
import { changePasswordApi } from '@/api/auth/changePassword' // You need to implement this API wrapper
import { useRouter } from 'next/navigation'

export default function ChangePasswordForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState(false)

  const validatePasswords = () => {
    if (!password || password.length < 6) {
      return 'Password must be at least 6 characters.'
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.'
    }
    return ''
  }

  useEffect(() => {
    localStorage.removeItem('forgot_email')
  }, [password, confirmPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    setError('')
    setSuccess('')

    const validationError = validatePasswords()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      const resetToken = localStorage.getItem('reset_token') || "" // ✅ Or get from router param
     
      const res = await changePasswordApi({ password, resetToken })

      if (res.status) {
        // setSuccess(res.message || 'Password changed successfully')
        setTimeout(() => {
          router.push('/password-complete?success=1') // ✅ Navigate to success message
        }, 500)
      } else {
        setError(res.message || 'Something went wrong')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const passwordError = touched && validatePasswords()

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5" />
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Change Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your new password to reset your account.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label>New Password<span className="text-error-500">*</span></Label>
              <Input
                type="password"
                value={password}
                placeholder="Enter new password"
                onChange={(e) => {
                  setPassword(e.target.value)
                  setTouched(true)
                }}
              />
            </div>

            <div className="mb-4">
              <Label>Confirm Password<span className="text-error-500">*</span></Label>
              <Input
                type="password"
                value={confirmPassword}
                placeholder="Confirm new password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setTouched(true)
                }}
              />
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
            </div>

            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
            {success && <p className="text-sm text-green-600 mb-2">{success}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Changing Password...' : 'Change Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
