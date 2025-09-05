'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/form/input/InputField'
import Label from '@/components/form/Label'
import Button from '@/components/ui/button/Button'
import { sendOtpApi } from '@/api/auth/sendOtp'
import { verifyForgetOtpApi } from '@/api/auth/verifyForgetOtp' // Create this
// import { setResetToken } from '@/utils/tokenUtils' // Optional: utility to store reset token

export default function ForgotOtpVerifyForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [touched, setTouched] = useState(false)

  const [timer, setTimer] = useState(30)
  const [isResendDisabled, setIsResendDisabled] = useState(true)

  // Load email from localStorage (from previous forgot step)
  useEffect(() => {
    const storedEmail = localStorage.getItem('forgot_email')
    if (!storedEmail) {
      router.push('/password-request') // fallback
    } else {
      setEmail(storedEmail)
    }
  }, [])

  // Countdown for resend
  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined
    if (isResendDisabled && timer > 0) {
      countdown = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    } else {
      setIsResendDisabled(false)
    }

    return () => {
      if (countdown) clearInterval(countdown)
    }
  }, [isResendDisabled, timer])

  const validateOtp = () => {
    if (!otp || otp.length !== 4) return 'OTP must be 4 digits'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    setError('')
    const otpError = validateOtp()
    if (otpError) {
      setError(otpError)
      return
    }

    setLoading(true)
    try {
      const res = await verifyForgetOtpApi({ email, otp })
      if (res.status && res.resetToken) {
        setSuccess('OTP Verified. Redirecting to change password...')
        
        // Store reset token temporarily
        localStorage.setItem('reset_token', res.resetToken)

        setTimeout(() => {
          router.push('/change-password') // Redirect to change screen
        }, 1500)
      } else {
        setError(res.message || 'OTP verification failed')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await sendOtpApi({ email, type: 'forgot' })
      if (res.status) {
        setSuccess('OTP resent successfully')
        setTimer(30)
        setIsResendDisabled(true)
      } else {
        setError(res.message || 'Failed to resend OTP')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const otpError = touched && validateOtp()

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5" />
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Verify OTP
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter the 4-digit code sent to your email to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label>
                OTP<span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value)
                  setTouched(true)
                }}
                maxLength={4}
                className={`${
                  otpError
                    ? 'border-red-500'
                    : touched && !otpError
                    ? 'border-green-500'
                    : ''
                }`}
              />
              {otpError && <p className="text-sm text-red-500 mt-1">{otpError}</p>}
            </div>

            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
            {success && <p className="text-sm text-green-600 mb-2">{success}</p>}

            <Button type="submit" disabled={loading} className="w-full mb-3">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <div className="text-sm text-center">
              {isResendDisabled ? (
                <p className="text-gray-500">
                  Resend available in <strong>{timer}s</strong>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-brand-500 hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
