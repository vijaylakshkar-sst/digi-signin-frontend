'use client'

import Input from '@/components/form/input/InputField'
import Label from '@/components/form/Label'
import { ChevronLeftIcon } from '@/icons'
import Button from '@/components/ui/button/Button'
import { sendOtpApi } from '@/api/auth/sendOtp'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'

export default function PasswordRequestForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState(false)

  const validateEmail = () => {
    if (!email.trim()) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Invalid email format'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const emailError = validateEmail()
    if (emailError) {
      setError(emailError)
      return
    }

    setLoading(true)
    try {
      const res = await sendOtpApi({ email, type: 'forgot' })
      if (res.status) {
        localStorage.setItem('forgot_email', email)
        router.push('/verify-forget')
      } else {
        setError(res.message || 'Failed to send OTP')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const emailError = touched && validateEmail()

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5" />
      <Link
        href="/signin"
        className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <ChevronLeftIcon />
        Back to Sign In
      </Link>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email to receive an OTP and reset your password.
            </p>
          </div>

          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <Label>Email<span className="text-error-500">*</span></Label>
                <Input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setTouched(true)
                    if (error) setError('')
                  }}
                  className={
                    emailError
                      ? 'border border-red-500'
                      : email
                      ? 'border border-green-500'
                      : ''
                  }
                />
                {emailError && (
                  <p className="text-sm text-red-500 mt-1">{emailError}</p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400">
              Remember your password?{' '}
              <Link
                href="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
